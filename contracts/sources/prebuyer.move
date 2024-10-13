/// Module: fair_fun
module fair_fun::prebuyer {
    use sui::balance::{ Balance, Self, zero };
    use sui::sui::SUI;
    use sui::clock::Clock;
    use fair_fun::utils::{calculate_auction_score};
    use std::fixed_point32::{FixedPoint32, create_from_raw_value, };
    use sui::coin::{Coin, into_balance};
    
    const MAX_U64: u64 = 0xFFFFFFFFFFFFFFFF;

    public enum Status has store, drop {
        Bidding,
        Owner,
        Exited
    }

    public struct Prebuyer has key, store {
        id: object::UID,
        lockings: Balance<SUI>,
        last_bid_time: u64,
        bidder_address: address,
        bid_size: Balance<SUI>,
        auction_score: FixedPoint32,
        status: Status,
    }

    public(package) fun new(lockings: Balance<SUI>, bid_size: Balance<SUI>, clock: &Clock, pool_release_date: &u64, ctx: &mut TxContext): Prebuyer{
        let current_time = clock.timestamp_ms();
        let prebuyer = Prebuyer {
            id: object::new(ctx),
            auction_score: calculate_auction_score(bid_size.value(), lockings.value(), pool_release_date, current_time),
            lockings: lockings,
            last_bid_time: current_time,
            bidder_address: ctx.sender(),
            bid_size: bid_size,
            status: Status::Bidding
        };
        prebuyer
    }

    public(package) fun new_dev(ctx: &mut TxContext, owner_lock_amount: Coin<SUI>, current_time: u64): Prebuyer {
        Prebuyer {
            id: object::new(ctx),
            lockings: into_balance(owner_lock_amount),
            last_bid_time: current_time,
            bidder_address: ctx.sender(),
            bid_size: zero<SUI>(),
            auction_score: create_from_raw_value(MAX_U64),
            status: Status::Owner,
        }
    }

    public(package) fun update(prebuyer: &mut Prebuyer, added_lockings: Balance<SUI>, added_bid_size: Balance<SUI>, clock: &Clock, pool_release_date: &u64) {
        let current_time = clock.timestamp_ms();
        let new_auction_score = calculate_auction_score(added_bid_size.value(), added_lockings.value() , pool_release_date, current_time);
        prebuyer.auction_score = create_from_raw_value(prebuyer.auction_score.get_raw_value() + new_auction_score.get_raw_value());
        balance::join(&mut prebuyer.bid_size, added_bid_size);
        balance::join(&mut prebuyer.lockings, added_lockings);
    }

    public(package) fun get_bidder_address(prebuyer: &Prebuyer): address {
        prebuyer.bidder_address
    }

    public(package) fun get_auction_score(prebuyer: &Prebuyer): FixedPoint32 {
        prebuyer.auction_score
    }

    public(package) fun withdraw_lockings(prebuyer: &mut Prebuyer): Balance<SUI> {
        prebuyer.lockings.withdraw_all()
    }

    public(package) fun exit_bidder(prebuyer: &mut Prebuyer): (Balance<SUI>, Balance<SUI>) {
        let lockings = prebuyer.lockings.withdraw_all();
        let bid_size = prebuyer.bid_size.withdraw_all();
        prebuyer.status = Status::Exited;

        (lockings, bid_size)
    }
}