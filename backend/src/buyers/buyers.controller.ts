import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BuyersService } from './buyers.service';

@Controller('buyers')
export class BuyersController {
  constructor(private buyersService: BuyersService) {}

  @Post()
  async createBuyer(
    @Body()
    buyerData: {
      walletAddress: string;
      devWalletAddress: string;
      lockedSize: number;
      bidSize: number;
    },
  ) {
    console.log('buyerData', buyerData);
    
    return this.buyersService.create(
      buyerData.walletAddress,
      buyerData.devWalletAddress,
      buyerData.lockedSize,
      buyerData.bidSize,
    );
  }

  @Get()
  async getBuyer(
    @Query('walletAddress') walletAddress: string,
    @Query('devWalletAddress') devWalletAddress: string,
  ) {
    return this.buyersService.findBuyer(walletAddress, devWalletAddress);
  }
}
