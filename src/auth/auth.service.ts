import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const result = await this.catRepository.findCatByEmail(email);

    if (!result) {
      throw new UnauthorizedException('please check email or password.');
    }

    const isValidatePassword = await bcrypt.compare(password, result.password);

    if (!isValidatePassword) {
      throw new UnauthorizedException('please check email or password.');
    }

    const payload = {
      email,
      sub: result.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
