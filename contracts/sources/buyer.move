module fair_fun::buyer {
    use sui::balance::{Balance};
    use sui::sui::SUI;
    use fair_fun::prebuyer::{Prebuyer, withdraw_lockings};
    use sui::object::{borrow_id};
    use std::vector::{push_back};

    public struct Buyer has store {
        id: object::ID,
        lockings: Balance<SUI>,
        bidder_address: address,
    }

    //i know that this isn't the best practice but it is the easiest
    public(package) fun new_buyers(prebuyers: &mut vector<Prebuyer>): vector<Buyer> {
        let mut i = 0;
        let mut buyers = vector::empty<Buyer>();
        while(i < prebuyers.length()) {
            let buyer = Buyer {
                id: *borrow_id(prebuyers.borrow(i)),
                lockings: prebuyers.borrow_mut(i).withdraw_lockings(),
                bidder_address: prebuyers.borrow(i).get_bidder_address(),
            };
            buyers.push_back(buyer);
            i = i + 1;
        };
        buyers
    }
}