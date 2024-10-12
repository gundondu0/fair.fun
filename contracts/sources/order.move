module fair_fun::order {

    use std::string::String;
    use fair_fun::prebuyer::{Self, Prebuyer};
    use sui::clock::Clock;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;

    const MIN_POOL_LIFETIME: u64 = 1800000;

    public enum OrderStatus has store, drop {
        Init,
        Open,
        OnDistribution,
        OnlyWithdraw,
        Cancelled,
        Finished,
    }
    
    public struct Metadata has store {
        name: String,
        description: String,
        image_url: String,
        social_urls: vector<String>
    }

    public struct Order has key {
        id: UID,
        metadata: Metadata,
        created_at: u64,
        release_date: u64,
        status: OrderStatus,
        prebuyers: vector<Prebuyer>
    }    

    // Admin capability
    public struct AdminCap has key {
        id: UID,
    }

    // Create new Order object
    public fun new(metadata: Metadata, release_date: u64, clock: &Clock, ctx: &mut TxContext) {

        // Get current time
        let current_time = clock.timestamp_ms();

        // Abort if release_date is too close
        assert!(release_date > current_time + MIN_POOL_LIFETIME, 0);    //TODO errors 

        let order = Order {
            id: object::new(ctx),
            metadata: metadata,
            created_at: clock.timestamp_ms(),
            release_date: release_date,
            status: OrderStatus::Open,
            prebuyers: vector::empty<Prebuyer>()
        };

        transfer::share_object(order);
    }

    public fun add_buyer(
        bid: Coin<SUI>, 
        sui: Coin<SUI>, 
        order: &mut Order, 
        clock: &Clock,
        ctx: &mut TxContext) {

        // Order should be open to bids
        assert!(&order.status == OrderStatus::Open);

        let bid_as_balance = coin::into_balance(bid);
        let sui_as_balance = coin::into_balance(sui);

        let prebuyer = prebuyer::new(sui_as_balance, bid_as_balance, clock, &order.release_date, ctx);

        // Save the prebuyer in the vector
        vector::push_back<Prebuyer>(&mut order.prebuyers, prebuyer);
    }


}