import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, password, name } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('This cat is already exist.');
    }

    const hash = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hash,
    });

    return cat.readonlydata;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    // console.log({ fileName });

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat._id,
      fileName,
    );

    return newCat;
  }

  async getAllCat() {
    const cats = await this.catsRepository.findAll();
    console.log({ cats });

    const readOnlyCats = cats.map((cat) => cat.readonlydata);

    return readOnlyCats;
  }
}
