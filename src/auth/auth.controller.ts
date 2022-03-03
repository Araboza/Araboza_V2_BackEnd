import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { loginDataDto } from 'src/dto/loginData.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async CreateUser(@Body() registerData: CreateUserDto) {
    await this.authService.register(registerData);
  }
  @UseGuards(RolesGuard)
  @Post('login')
  async Login(@Body() loginData: loginDataDto) {
    const Token = await this.authService.login(loginData);
    return Token;
  }
}
