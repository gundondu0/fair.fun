module fair_fun::utils {

    const PRECISION_FACTOR: u64 = 1000;

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

    public fun calculate_auction_score(bid_amount: u64, locked_amount: u64, release_timestamp: &u64, bid_timestamp: u64): u64 {
        let beta: u64 = (5* PRECISION_FACTOR) / (10 * PRECISION_FACTOR);

        let bid_amount_scaled = bid_amount * PRECISION_FACTOR;
        let locked_amount_scaled = locked_amount * PRECISION_FACTOR;

        let time_ratio = (*release_timestamp - bid_timestamp) * PRECISION_FACTOR / release_timestamp * PRECISION_FACTOR;
        let auction_score = (bid_amount_scaled / locked_amount_scaled) * (1 * PRECISION_FACTOR + beta * time_ratio);

        auction_score
    }

}