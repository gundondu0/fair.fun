module fair_fun::distributor {

    use sui::balance::{Balance, split};
    use fair_fun::buyer::{Self, Buyer};
    use fair_fun::prebuyer::Prebuyer;
    use sui::coin::{Coin, from_balance, zero};
    use sui::clock::Clock;
    use sui::sui::SUI;
    use sui::random::{Random, new_generator};
    use fair_fun::math::{exp, pow, from, to_u128, div, mul};
    use std::fixed_point32::{create_from_rational};

    public struct Distributor<phantom T> {
        token_pool: Balance<T>,   //tokens
        sui_pool: Balance<SUI>,
        created_at: u64,
        ends_at: u64,
        buyers: vector<Buyer<T>>     // Sorted
    }

    // Wrapper type
    public struct RandomNumber has drop {
        num1: u64,
        num2: u64
    }

    public(package) fun new<T>(coin: Coin<T>, sui_pool: Balance<SUI>, created_at: u64, ends_at: u64, prebuyers: &mut vector<Prebuyer>): Distributor<T> {

        let token_pool = coin.into_balance();

        // Sort prebuyers by auction score
        let prebuyers_length = prebuyers.length();
        quick_sort(prebuyers, 0, prebuyers_length - 1);

        let buyers = buyer::new_buyers(prebuyers);

        let mut distributor = Distributor {
            token_pool,
            sui_pool,
            created_at,
            ends_at,
            buyers
        };

        buy_from_pool(&mut distributor);
        distributor
    }
    
    fun get_token_price<T>(distributor: &Distributor<T>): (u64, u64) {
        (distributor.sui_pool.value(), distributor.token_pool.value())        
    }

    fun buy_from_pool<T>(distributor: &mut Distributor<T>) {
        let mut i = distributor.buyers.length();
        while (i >= 0) {
            let (numerator, denominator) = get_token_price(distributor);

            let buyer = distributor.buyers.borrow_mut(i);

            //black magic to simulate dex
            let allocated_tokens = create_from_rational(denominator * buyer.get_buyer_lockings_u64(), numerator).get_raw_value() >> 16;

            distributor.sui_pool.join(buyer.get_buyer_lockings());

            buyer.add_tokens(distributor.token_pool.split(allocated_tokens));
            i = i - 1;
        };
    }

    fun probabilistic_withdraw<T>(rnd: &RandomNumber, buyer: &mut Buyer<T>, ctx: &mut TxContext): Coin<T> {
        let rnd_num = (rnd.num2 % 10) + 1;
        let mut value = create_from_rational(buyer.get_buyer_tokens_u64(), 10*rnd_num).get_raw_value() << 16;
        if (value < buyer.get_buyer_tokens_u64()) {
            value = buyer.get_buyer_tokens_u64()
        };

        from_balance(buyer.withdraw_tokens(value),ctx)
    }

    fun quick_sort(prebuyers: &mut vector<Prebuyer>, left: u64, right: u64) {
        if (left < right) {
            let partition_index = partion(prebuyers, left, right);

            if (partition_index > 1) {
                quick_sort(prebuyers, left, partition_index - 1);
            };
            quick_sort(prebuyers, partition_index + 1, right);
        }
    }

    fun partion(prebuyers: &mut vector<Prebuyer>, left: u64, right: u64): u64 {
        let pivot: u64 = left;
        let mut index: u64 = pivot + 1;
        let mut i: u64 = index;

        while (i <= right) {
            if (prebuyers[i].get_auction_score().get_raw_value() < prebuyers[pivot].get_auction_score().get_raw_value()) {
                prebuyers.swap(i, index);
                index = index + 1;
            };
            i = i + 1;
        };

        prebuyers.swap(pivot, index - 1);

        index - 1
    }

    // Generate a random number
    entry fun gen_rnd(r: &Random, ctx: &mut TxContext): RandomNumber {
        let mut generator = new_generator(r, ctx);

        RandomNumber { 
            num1: generator.generate_u64(), 
            num2: generator.generate_u64()
        }
    }

    // Gaussian function, output in [0, 100]
    fun gaussian(x: u128): u128 {

        let x_as_f64 = from(x);

        let y = div(from(1), exp(pow(x_as_f64, 2)));
        // scale y to 100
        let scaled_y = mul(y,from(100));

        to_u128(scaled_y)

    }

    public fun distribute<T>(distributor: &mut Distributor<T>, clock: &Clock, rnd: &RandomNumber, ctx: &mut TxContext): vector<Coin<T>> {
        let mut coins_to_be_sent = vector::empty<Coin<T>>();
        let current_time = clock.timestamp_ms();
        let buyers_number = distributor.buyers.length();
        // epoch length
        let epoch_length = (distributor.ends_at - distributor.created_at) / buyers_number;

        let current_epoch = (current_time - distributor.created_at) / epoch_length;

        let mut i = 0;
        while (i <= distributor.buyers.length()) {
            // first buyer is the lowest in ranking
            let buyer = distributor.buyers.borrow_mut(i);
            let rnd_num = (rnd.num1 % 100) + 1;

            // check that for underflow
            let mut x;
            if (current_epoch >= i) {
                x = current_epoch - i;
            } else {
                x = i - current_epoch;
            };

            let y = gaussian((x) as u128);

            if (rnd_num as u128 <= y) {
                coins_to_be_sent.push_back(probabilistic_withdraw(rnd, buyer, ctx));
            } else {
                coins_to_be_sent.push_back(zero(ctx));
            };

            i = i + 1;
        };
        vector::reverse(&mut coins_to_be_sent);
        coins_to_be_sent
    }
}