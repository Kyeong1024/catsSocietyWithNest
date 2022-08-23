import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({ timestamps: true })
export class Cat {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsString()
  imageUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
