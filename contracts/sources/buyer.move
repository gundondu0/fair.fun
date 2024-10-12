module fair_fun::buyer {
    public struct Buyer has key, store {
        id: object::UID,
        lockings: Balance<SUI>,
        bidder_address: address,
    }
}