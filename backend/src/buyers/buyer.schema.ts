import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BuyerDocument = Buyer & Document;

@Schema()
export class Buyer {

  _id: Types.ObjectId; // Explicitly defining _id

  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  devWalletAddress: string;

  @Prop({ required: true })
  lockedSize: number;

  @Prop({ required: true })
  bidSize: number;

  @Prop({ default: 0 })
  auctionScore: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
