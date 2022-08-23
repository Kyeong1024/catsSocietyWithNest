import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({ timestamps: true })
export class Cat {
  id: string;

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

  readonly readOnlyData: { email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
