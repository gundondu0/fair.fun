import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Request() req,
    @Body() commentData: { walletAddress:string, content: string; coinId: string },
  ) {
    console.log(commentData);
    
    return this.commentsService.create(
      commentData.walletAddress,
      commentData.content,
      commentData.coinId,
    );
  }

  @Get(':coinId')
  async getComments(@Param('coinId') coinId: string) {
    return this.commentsService.findByCoinId(coinId);
  }
}
