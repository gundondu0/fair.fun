import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './comment.schema';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentsService],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
