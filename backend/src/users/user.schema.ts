import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop()
  lastSignedIn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
