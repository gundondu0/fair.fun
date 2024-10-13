import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Buyer, BuyerDocument } from './buyer.schema';
import { Order, OrderDocument } from '../orders/orders.schema'; // Adjust path as needed

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel(Buyer.name) private readonly buyerModel: Model<BuyerDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>, // Inject OrderModel
  ) {}

  async create(
    walletAddress: string,
    devWalletAddress: string,
    lockedSize: number,
    bidSize: number,
  ): Promise<Buyer> {
    const existingBuyer = await this.findBuyer(walletAddress, devWalletAddress);

    let buyer: Buyer;

    if (existingBuyer) {
      buyer = await this.buyerModel
        .findOneAndUpdate(
          { walletAddress, devWalletAddress },
          {
            $inc: {
              lockedSize: lockedSize,
              bidSize: bidSize,
            },
          },
          { new: true },
        )
        .exec();
    } else {
      const newBuyer = new this.buyerModel({
        walletAddress,
        devWalletAddress,
        lockedSize,
        auctionScore:lockedSize * 42, // use defined formula
        bidSize,
      });
      buyer = await newBuyer.save();
    }

    // Append the buyer to the order's `users` array
    await this.orderModel.findOneAndUpdate(
      {creator:devWalletAddress},
      { $addToSet: { users: buyer._id } }, // Ensures the buyer ID is unique in the array
      { new: true },
    );

    return buyer;
  }

  async findBuyer(
    walletAddress: string,
    devWalletAddress: string,
  ): Promise<Buyer | null> {
    return this.buyerModel.findOne({ walletAddress, devWalletAddress }).exec();
  }
}
