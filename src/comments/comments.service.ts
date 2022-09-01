import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comment } from './comment.schema';
import { CommentCreateDto } from './dto/comment.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async createComments(id: string, commentData: CommentCreateDto) {
    try {
      const target = await this.catsRepository.findCatByIdWithoutPassword(id);

      const { author, contents } = commentData;

      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentModel({
        author: validatedAuthor._id,
        contents,
        info: target._id,
      });

      return await newComment.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      comment.likeNumber += 1;

      return await comment.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
