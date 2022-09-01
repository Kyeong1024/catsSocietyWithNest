import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// import { Comment, CommentSchema } from 'src/comments/comment.schema';
import { Cat } from './cat.schema';
import { CatRequestDto } from './dto/cats.request.dto';
// import * as mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return !!result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async findCatByEmail(email: string) {
    return this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    // console.log({ fileName });

    const cat = await this.catModel.findById(id);
    const imageUrl = `http://localhost:8003/media/${fileName}`;
    // console.log({ imageUrl });

    cat.imageUrl = imageUrl;
    const newCat = await cat.save();

    return newCat.readonlydata;
  }

  async findAll() {
    // 이렇게 해도 동작하나 아래 CommentsModel없이도 동작한다.
    // const CommentsModel = mongoose.model('Comments', CommentsSchema);
    // const result = await this.catModel.find().populate('comments', CommentsModel);

    const result = await this.catModel.find().populate('comments');
    // console.log('----->', result);

    return result;
  }
}
