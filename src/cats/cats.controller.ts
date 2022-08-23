import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositivePipe } from 'src/common/pipes/positive.pipe';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post()
  logIn() {
    return 'logIn';
  }

  @Post()
  logOut() {
    return 'logOut';
  }

  @Post()
  uploadCatImg() {
    return 'uploadImg';
  }
}
