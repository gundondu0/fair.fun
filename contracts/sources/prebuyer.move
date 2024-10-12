/// Module: fair_fun
module fair_fun::prebuyer {
    use sui::balance::{ Balance, Self };
    use sui::sui::SUI;
    use sui::clock::Clock;

    public enum Status has store{
        Bidding,
        Exited
    }

    public struct Prebuyer has key, store {
        id: object::UID,
        lockings: Balance<SUI>,
        last_bid_time: u64,
        bidder_address: address,
        bid_size: Balance<SUI>,
        auction_score: u64,
        status: Status,
    }

    fun calculate_auction_score(last_bid_time: u64, lockings: &Balance<SUI>, bid_size: &Balance<SUI>, pool_release_date:u64): u64 {
        let lockings_u64 = lockings.value();
        let bid_size_u64 = bid_size.value();
        let beta: u64 = 10;
        let result: u64 = (lockings_u64/bid_size_u64)*(1+1/beta*(((pool_release_date-last_bid_time)/pool_release_date)/1000));
        result
    }

    fun new(ctx: &mut TxContext, lockings: Balance<SUI>, bid_size: Balance<SUI>, clock: &Clock, pool_release_date: u64): Prebuyer{
        let current_time = clock.timestamp_ms();
        let prebuyer = Prebuyer {
            id: object::new(ctx),
            auction_score: calculate_auction_score(current_time, &lockings, &bid_size, pool_release_date),
            lockings: lockings,
            last_bid_time: current_time,
            bidder_address: ctx.sender(),
            bid_size: bid_size,
            status: Status::Bidding
        };
        prebuyer
    }

    fun update(ctx: &mut TxContext, added_lockings: Balance<SUI>, added_bid_size: Balance<SUI>, prebuyer: &mut Prebuyer, clock: &Clock) {
        let new_bid_size = balance::join(&mut prebuyer.bid_size, added_bid_size);
        let new_lokcings = balance::join(&mut prebuyer.lockings, added_lockings);
        
    }

}