import { Controller, Post, Get, Param, Body, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(
    @Request() req,
    @Body() orderData: {
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
      users: string[]; // Expect an array of User ObjectIds as strings
    },
  ) {
    console.log('orderData', orderData);
    
    return this.orderService.create(orderData);
  }

  @Get(':creator')
  async getOrdersByCreator(@Param('creator') creator: string) {
    return this.orderService.findOrder(creator);
  }

  @Get()
  async getOrders() {
    return this.orderService.getAllOrders();
  }


}
