import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CommentCreateDto } from './dto/comment.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @Post(':id')
  createComments(@Param('id') id: string, @Body() body: CommentCreateDto) {
    return this.commentsService.createComments(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기.' })
  @Patch(':id')
  plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
