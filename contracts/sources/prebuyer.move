/// Module: fair_fun
module fair_fun::prebuyer {
    use sui::balance::{ Balance };
    use sui::sui::SUI;

    public struct Prebuyer has key, store {
        id: sui::object::UID,
        lockings: Balance<SUI>,
        last_bid_time: u64,
        address: address,
        buy_size: u64
    }
}
