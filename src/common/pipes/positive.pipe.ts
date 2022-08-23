import { PipeTransform, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class PositivePipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('negative id', 401);
    }

    return value;
  }
}
