module fair_fun::order {

    use std::string::String;
    use fair_fun::prebuyer::Prebuyer;
    use sui::clock::Clock;

    const MIN_POOL_LIFETIME: u64 = 1800000;

    public enum OrderStatus has store {
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

    public fun new(metadata: Metadata, release_date: u64, ctx: &mut TxContext, clock: &Clock) {

        let current_time = clock.timestamp_ms();

        assert!(release_date > current_time + MIN_POOL_LIFETIME, 0);    //TODO error

        let order = Order {
            id: object::new(ctx),
            metadata: metadata,
            created_at: clock.timestamp_ms(),
            release_date: release_date,
            status: OrderStatus::Init,
            prebuyers: vector::empty<Prebuyer>()
        };

        transfer::share_object(order);



    }

}