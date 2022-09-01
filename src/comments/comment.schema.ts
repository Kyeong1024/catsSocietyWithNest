import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

// export type CommentsDocument = Comments & Document;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment extends Document {
  @ApiProperty({
    description: '작성자 id',
    required: true,
  })
  @Prop({ type: Types.ObjectId, required: true, ref: 'Cat' })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({ description: '댓글 내용', required: true })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({ description: '게시물 주인 id', required: true })
  @Prop({ type: Types.ObjectId, required: true, ref: 'Cat' })
  @IsNotEmpty()
  info: Types.ObjectId;

  @ApiProperty({ description: '좋아요 숫자' })
  @Prop({ default: 0 })
  @IsPositive()
  likeNumber: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
