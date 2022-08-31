import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

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

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
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
}
