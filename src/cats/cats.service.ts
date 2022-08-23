import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async signUp(body: CatRequestDto) {
    const { email, password, name } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('This cat is already exist.');
    }

    const hash = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hash,
    });

    return cat.readOnlyData;
  }
}
