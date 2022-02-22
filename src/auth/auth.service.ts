import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { loginDataDto } from 'src/dto/loginData.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtSercice: JwtService,
  ) {}
  public async register(registerData: CreateUserDto) {
    const test = await this.usersService.findId(registerData);
    if (!test) {
      const hashedPassword = await bcrypt.hash(registerData.password, 10);
      try {
        const createUser = await this.usersService.create({
          ...registerData,
          password: hashedPassword,
        });
        createUser.password = undefined;
        return createUser;
      } catch (error) {
        throw new HttpException(
          '알 수 없는 오류가 발생하였습니다',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new ConflictException();
    }
  }
  public async login(loginData: loginDataDto) {
    const hashPassword = await this.usersService.login(loginData);
    const PasswordResult = await bcrypt.compare(
      loginData.password,
      hashPassword,
    ); //비밀번호 검사
    if (PasswordResult) {
      if (loginData.accessToken === null) {
        const id = await this.usersService.findId(loginData);
        const newAccessToken = await this.jwtSercice.sign({ id: id });
        console.log('액세스토큰', newAccessToken);
        return { accessToken: newAccessToken };
      }
    } else {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async getAccessToken(id: string) {
    const token = await this.jwtSercice.sign({ id: id });
    return token;
  }
}
