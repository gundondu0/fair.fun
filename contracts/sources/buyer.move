module fair_fun::buyer {
    use sui::balance::{Balance, zero, withdraw_all};
    use sui::sui::SUI;
    use fair_fun::prebuyer::{Prebuyer, withdraw_lockings};
    use sui::object::{borrow_id};
    use std::vector::{push_back};

    public struct Buyer<phantom T> has store {
        id: object::ID,
        lockings: Balance<SUI>,
        bidder_address: address,
        tokens: Balance<T>
    }

    //i know that this isn't the best practice but it is the easiest
    public(package) fun new_buyers<T>(prebuyers: &mut vector<Prebuyer>): vector<Buyer<T>> {
        let mut i = 0;
        let mut buyers = vector::empty<Buyer<T>>();
        while(i < prebuyers.length()) {
            let buyer = Buyer {
                id: *borrow_id(prebuyers.borrow(i)),
                lockings: prebuyers.borrow_mut(i).withdraw_lockings(),
                bidder_address: prebuyers.borrow(i).get_bidder_address(),
                tokens: zero()
            };
            buyers.push_back(buyer);
            i = i + 1;
        };
        buyers
    }

    public(package) fun get_buyer_lockings<T>(self: &mut Buyer<T>): Balance<SUI> {
        self.lockings.withdraw_all()
    }

    public(package) fun get_buyer_lockings_u64<T>(self: &Buyer<T>): u64 {
        self.lockings.value()
    }

    public(package) fun add_tokens<T>(self: &mut Buyer<T>, balance: Balance<T>) {
        self.tokens.join(balance);
    }

    public(package) fun withdraw_tokens<T>(self: &mut Buyer<T>, value: u64): Balance<T> {
        self.tokens.split(value)
    }

    public(package) fun get_buyer_tokens_u64<T>(self: &Buyer<T>): u64 {
        self.tokens.value()
    }
}