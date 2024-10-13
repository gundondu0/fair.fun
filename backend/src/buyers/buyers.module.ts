import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyersService } from './buyers.service';
import { Buyer, BuyerSchema } from './buyer.schema';
import { BuyersController } from './buyers.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Buyer.name, schema: BuyerSchema }]),
    forwardRef(() => OrdersModule), // Use forwardRef here
  ],
  providers: [BuyersService],
  exports: [
    MongooseModule.forFeature([{ name: Buyer.name, schema: BuyerSchema }]),
    BuyersService,
  ],
  controllers: [BuyersController],
})
export class BuyersModule {}
