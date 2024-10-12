import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(walletAddress: string): Promise<User | null> {
    return this.userModel.findOne({ walletAddress }).exec();
  }

  async create(walletAddress: string): Promise<User> {
    const newUser = new this.userModel({
      walletAddress,
      lastSignedIn: new Date(),
    });
    return newUser.save();
  }

  async updateLastSignedIn(walletAddress: string): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate(
        { walletAddress },
        { lastSignedIn: new Date() },
        { new: true },
      )
      .exec();
  }
}
