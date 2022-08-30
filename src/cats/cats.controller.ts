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
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositivePipe } from 'src/common/pipes/positive.pipe';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) {
    return cat.readonlydata;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'server error...',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatRequestDto,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @Post('upload/cat')
  uploadCatImg() {
    return 'uploadImg';
  }
}
