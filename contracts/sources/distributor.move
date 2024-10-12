module fair_fun::distributor {

    use sui::balance::{Balance};
    use fair_fun::buyer::Buyer;
    use sui::coin::Coin;
    use sui::clock::Clock;
    use sui::random::RandomGenerator;

    public struct Distributor<phantom T> {
        balance: Balance<T>,    // tokens
        created_at: u64,
        ends_at: u64,
        buyers: vector<Buyer>                // Sorted
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

    public fun distribute<T>(distributor: &mut Distributor<T>, clock: &Clock, rnd: &mut RandomGenerator) {

        let current_time = clock.timestamp_ms();
        let buyers_number = distributor.buyers.length();
        // epoch length
        let epoch_length = (distributor.ends_at - distributor.created_at) / buyers_number;

        let current_epoch = (current_time - distributor.created_at) / epoch_length;

        let mut i = 0;
        while (i <= distributor.buyers.length()) {
            let buyer = distributor.buyers.borrow_mut(i);
            let rnd_num = rnd.generate_u64_in_range(1, 10);

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