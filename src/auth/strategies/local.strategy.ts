import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { loginDataDto } from 'src/dto/loginData.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginData: loginDataDto): Promise<any> {
    const user = await this.authService.validate(loginData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
