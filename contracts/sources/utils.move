module fair_fun::utils {
    use std::fixed_point32::{create_from_rational, create_from_raw_value, FixedPoint32};

    const ONE_OVER_BETA: u64 = 10;
    /*
    pub fn calculate_auction_score(bid_amount: u64, sol_amount: u64, pool_release_timestamp: i64, bid_timestamp: i64) -> u64 {
        const BETA: f64 = 0.5;
        let bid_amount_f64 = bid_amount as f64;
        let sol_amount_f64 = sol_amount as f64;
        let time_ratio = (pool_release_timestamp - bid_timestamp) as f64 / pool_release_timestamp as f64;

        let auction_score = (bid_amount_f64 / sol_amount_f64) * (1.0 + BETA * time_ratio);
        auction_score as u64
    }
    */

    public fun calculate_auction_score(bid_amount: u64, locked_amount: u64, release_timestamp: &u64, bid_timestamp: u64): FixedPoint32 {
        let coin_ratio: FixedPoint32 = create_from_rational(bid_amount, locked_amount);
        let numerator: u64 = bid_amount*(*release_timestamp-bid_timestamp);
        let denumerator: u64 = locked_amount*ONE_OVER_BETA**release_timestamp;
        let other_ratio: FixedPoint32 = create_from_rational(numerator,denumerator);

        let auction_score: FixedPoint32 = create_from_raw_value((coin_ratio.get_raw_value()+other_ratio.get_raw_value()));

        auction_score
    }

}