import { PickType } from '@nestjs/swagger';
import { Comment } from '../comment.schema';

export class CommentCreateDto extends PickType(Comment, [
  'author',
  'contents',
]) {}
