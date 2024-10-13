module fair_fun::distributor {

    use sui::balance::{Balance};
    use fair_fun::buyer::Buyer;
    use sui::coin::Coin;
    use sui::clock::Clock;
    use sui::random::{Random, new_generator};

    public struct Distributor<phantom T> {
        balance: Balance<T>,    // tokens
        created_at: u64,
        ends_at: u64,
        buyers: vector<Buyer>                // Sorted
    }

    // Wrapper type
    public struct RandomNumber has drop {
        num: u64
    }

    public(package) fun new<T>(coin: Coin<T>, created_at: u64, ends_at: u64, buyers: vector<Buyer>): Distributor<T> {

        let balance = coin.into_balance();

        Distributor {
            balance,
            created_at,
            ends_at,
            buyers
        }

    }

    // Generate a random number
    entry fun gen_rnd(r: &Random, ctx: &mut TxContext): RandomNumber {
        let mut generator = new_generator(r, ctx);

        RandomNumber { 
            num: generator.generate_u64() 
        }
    }

    public fun distribute<T>(distributor: &mut Distributor<T>, clock: &Clock, rnd: &RandomNumber, ctx: &mut TxContext) {

        let current_time = clock.timestamp_ms();
        let buyers_number = distributor.buyers.length();
        // epoch length
        let epoch_length = (distributor.ends_at - distributor.created_at) / buyers_number;

        let current_epoch = (current_time - distributor.created_at) / epoch_length;

        let mut i = 0;
        while (i <= distributor.buyers.length()) {
            let buyer = distributor.buyers.borrow_mut(i);
            let rnd_num = (rnd.num % 10) + 1;

            // first buyer is the lowest in ranking
            if (current_epoch >= i) {
                // 50%
                if (rnd_num <= 5) {
                    // Withdraw
                }
            } else {
                // 10%
                if (rnd_num <= 1) {
                    // Withdraw
                }
            };
            i = i + 1;
        }
    }
}