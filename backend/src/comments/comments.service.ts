import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(
    walletAddress: string,
    content: string,
    coinId: string,
  ): Promise<Comment> {
    const newComment = new this.commentModel({
      walletAddress,
      content,
      coinId,
    });
    return newComment.save();
  }

  async findByCoinId(coinId: string): Promise<Comment[]> {
    return this.commentModel.find({ coinId }).sort({ createdAt: -1 }).exec();
  }
}
