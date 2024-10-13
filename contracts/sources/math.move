/* Function borrowed from SuiTears */
module fair_fun::math {

    use fair_fun::math256;

    // @dev Natural log 2 in 32-bit fixed point. ln(2) in fixed 64 representation.
    const LN2: u256 = 12786308645202655660;
    // @dev Maximum Unsigned 128 Bit number
    const MAX_U128: u256 = 340282366920938463463374607431768211455;

    // === Errors ===

    // @dev It is thrown if an operation results in a value outside of 2^-64 .. 2^64-1.
    const EOutOfRange: u64 = 1;
    // @dev It is thrown if one tries to divide by zero.
    const EZeroDivision: u64 = 3;
    // @dev Abort code on overflow.
    const EOverflowExp: u64 = 5;
    // === Private Functions ===
    // @dev A type guard to identify a FixedPoint64.
    public struct FixedPoint64 has copy, drop, store { value: u128 }

    /*
     * @notice Creates a FixedPoint64 from a u128 number.
     *
     * @dev It scales the number.
     * @param value A u128 number
     * @return FixedPoint64. A FixedPoint64 calculated by right shifting - `value` << 64.
     *
     * aborts-if
     * - The left-shifted `value` is larger than `MAX_U128`.
     */
    public fun from(value: u128): FixedPoint64 {
        let scaled_value = (value as u256) << 64;
        assert!(scaled_value <= MAX_U128, EOutOfRange);
        FixedPoint64 {value: (scaled_value as u128)}
    }

    /*
     * @notice Converts a FixedPoint64 into a u128 number to the closest integer.
     *
     * @param self A FixedPoint64.
     * @return u128.
     */
    public fun to_u128(self: FixedPoint64): u128 {
        let floored_num = to_u128_down(self) << 64;
        let boundary = floored_num + ((1 << 64) / 2);
        if (self.value < boundary) {
            floored_num >> 64
        } else {
            to_u128_up(self)
        }
    }

    /*
     * @notice Converts a FixedPoint64 into a u128 number rounding down.
     *
     * @param self A FixedPoint64.
     * @return u128.
     */
    public fun to_u128_down(self: FixedPoint64): u128 {
        self.value >> 64
    }

    /*
     * @notice Converts a FixedPoint64 into a u128 number rounding up.
     *
     * @param self A FixedPoint64.
     * @return u128.
     */
    public fun to_u128_up(self: FixedPoint64): u128 {
        let floored_num = to_u128_down(self) << 64;
        if (self.value == floored_num) {
            return floored_num >> 64
        };
        let val = ((floored_num as u256) + (1 << 64));
        (val >> 64 as u128)
    }
    /*
     * @notice It returns `base` ** `exponent`.
     *
     * @param base The base.
     * @param exponent The exponent.
     * @return FixedPoint64. The result of `base` ** `exponent`.
     *
     * @aborts-if
     *   - aborts if the end result is higher than `MAX_U128`.
     */
    public fun pow(base: FixedPoint64, exponent: u64): FixedPoint64 {
        let raw_value = (base.value as u256);
        FixedPoint64 {value: (pow_raw(raw_value, (exponent as u128)) as u128)}
    }

    /*
     * @notice It returns `x` / `y`.
     *
     * @param x The first operand.
     * @param y The second operand.
     * @return FixedPoint64. The result of `x` / `y`.
     *
     * @aborts-if
     *   - aborts if `y` is zero.
     */
    public fun div(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        assert!(y.value != 0, EZeroDivision);
        FixedPoint64 {
            value: (math256::div_down((x.value as u256) << 64, (y.value as u256)) as u128),
        }
    }

    /*
     * @notice It returns `x` * `y`.
     *
     * @dev Use {mul_128} if you think the values can overflow.
     *
     * @param x The first operand.
     * @param y The second operand.
     * @return FixedPoint64. The result of `x` * `y`.
     *
     * @aborts-if
     *   - aborts if inner values overflow
     */
    public fun mul(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        FixedPoint64 {value: ((((x.value as u256) * (y.value as u256)) >> 64) as u128)}
    }

    /*
     * @notice Exponent function with a precision of 9 digits.
     * @notice It performs e^x.
     *
     * @param x The operand.
     * @return FixedPoint64. The result of e^x.
     */
    public fun exp(x: FixedPoint64): FixedPoint64 {
        let raw_value = (x.value as u256);
        FixedPoint64 {value: (exp_raw(raw_value) as u128)}
    }

    /*
     * @notice Calculates e^x where x and the result are fixed point numbers.
     *
     * @param x The base.
     * @return u256. The result of e^x.
     */
    fun exp_raw(x: u256): u256 {
        // exp(x / 2^64) = 2^(x / (2^64 * ln(2))) = 2^(floor(x / (2^64 * ln(2))) + frac(x / (2^64 * ln(2))))
        let shift_long = x / LN2;
        assert!(shift_long <= 63, EOverflowExp);
        let shift = (shift_long as u8);
        let remainder = x % LN2;
        // At this point we want to calculate 2^(remainder / ln2) << shift
        // ln2 = 580 * 22045359733108027
        let bigfactor = 22045359733108027;
        let exponent = remainder / bigfactor;
        let x = remainder % bigfactor;
        // 2^(remainder / ln2) = (2^(1/580))^exponent * exp(x / 2^64)
        let roottwo = 18468802611690918839;
        // fixed point representation of 2^(1/580)
        // 2^(1/580) = roottwo(1 - eps), so the number we seek is roottwo^exponent (1 - eps * exponent)
        let mut power = pow_raw(roottwo, (exponent as u128));
        let eps_correction = 219071715585908898;
        power = power - ((power * eps_correction * exponent) >> 128);
        // x is fixed point number smaller than bigfactor/2^64 < 0.0011 so we need only 5 tayler steps
        // to get the 15 digits of precission
        let taylor1 = (power * x) >> (64 - shift);
        let taylor2 = (taylor1 * x) >> 64;
        let taylor3 = (taylor2 * x) >> 64;
        let taylor4 = (taylor3 * x) >> 64;
        let taylor5 = (taylor4 * x) >> 64;
        let taylor6 = (taylor5 * x) >> 64;
        (power << shift) + taylor1 + taylor2 / 2 + taylor3 / 6 + taylor4 / 24 + taylor5 / 120 +
        taylor6 / 720
    }

    /*
     * @notice Calculate `x` to the power of `n`, where `x` and the result are fixed point numbers.
     *
     * @param x The base.
     * @param n The exponent.
     * @return u256. The result of x^n.
     */
    fun pow_raw(mut x: u256, mut n: u128): u256 {
        let mut res: u256 = 1 << 64;
        while (n != 0) {
            if (n & 1 != 0) {
                res = (res * x) >> 64;
            };
            n = n >> 1;
            x = (x * x) >> 64;
        };
        res
    }
}