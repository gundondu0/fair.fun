import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './orders.schema';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BuyersModule } from '../buyers/buyers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => BuyersModule), // Use forwardRef here
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    OrdersService,
  ],
})
export class OrdersModule {}
