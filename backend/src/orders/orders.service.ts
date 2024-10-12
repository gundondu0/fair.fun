import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './orders.schema';
import { Buyer, BuyerDocument } from '../buyers/buyer.schema'; // Import Buyer schema


export class CreateOrderDto {
  name: string;
  symbol: string;
  creator: string;
  endsAt: Date;
  platform: string;
  description: string;
  website: string;
  x: string;
  telegram: string;
  discord: string;
  initialBuySize: string;
  imageUrl: string;
  users: string[]; // Array of User ObjectIds as strings
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Buyer.name) private readonly buyerModel: Model<BuyerDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newBuyer = new this.buyerModel({
      walletAddress: createOrderDto.creator,
      devWalletAddress: createOrderDto.creator, // Assuming the creator's wallet address is used as devWallet too
      lockedSize: Number(createOrderDto.initialBuySize),
      bidSize: 0, // Initial bid size set to zero for the creator
      auctionScore: 999999, // Initial auction score set to zero for the creator
    });
    const savedBuyer = await newBuyer.save();
    const newOrder = new this.orderModel({
      name: createOrderDto.name,
      symbol: createOrderDto.symbol,
      creator: createOrderDto.creator,
      endsAt: createOrderDto.endsAt,
      platform: createOrderDto.platform,
      description: createOrderDto.description,
      website: createOrderDto.website,
      x: createOrderDto.x,
      telegram: createOrderDto.telegram,
      discord: createOrderDto.discord,
      initialBuySize: createOrderDto.initialBuySize,
      imageUrl: createOrderDto.imageUrl,
      users:[savedBuyer._id] , // Assume this is an array of User ObjectIds
    });
    return newOrder.save();
  }

  async findOrder(creator: string): Promise<Order> {
    return this.orderModel.findOne({ creator });
  }
  async getAllOrders(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate({
        path: 'users',
        model: 'Buyer', // Specify the model name explicitly if necessary
        options: { sort: { auctionScore: -1 } }, // Sort by auctionScore in descending order
      })
      .exec();
  }
 
}