import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Comment } from 'src/comments/comment.schema';

@Schema({ timestamps: true, collection: 'cats' })
export class Cat extends Document {
  // nest v9, mongoose v6 에서는 id를 꼭 넣어줘야 했지만 nest v8, mongoose v5에서는 괜찮음.
  // @ApiProperty({
  //   example: '507f1f77bcf86cd799439011',
  //   description: 'id',
  // })
  // id: any;

  @ApiProperty({
    example: 'abc@abc.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'abc123',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'maw',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    default:
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg',
  })
  @IsString()
  imageUrl: string;

  readonly comments: Comment[];

  readonly readonlydata: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    comments: Comment[];
  };
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readonlydata').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imageUrl: this.imageUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
