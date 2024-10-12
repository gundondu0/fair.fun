import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true,unique: true })
  creator: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  endsAt: Date;

  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: true })
  x: string;

  @Prop({ required: true })
  telegram: string;

  @Prop({ required: true })
  discord: string;

  @Prop({ required: true })
  initialBuySize: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Buyer' }] }) // Reference to User schema
  users: Types.ObjectId[]; // Array of ObjectIds referencing User documents
}

export const OrderSchema = SchemaFactory.createForClass(Order);
