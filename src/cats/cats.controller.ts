import {
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

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    console.log('controller..');

    return 'get all cats';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositivePipe) param: number) {
    console.log(param, typeof param);
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put('/:id')
  updateCat() {
    return 'update cat';
  }

  @Patch('/:id')
  updatePartialCat() {
    return 'update cat partially';
  }

  @Delete('/:id')
  deleteCat() {
    return 'delete Cat';
  }
}
