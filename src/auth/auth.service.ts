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
    const user = await this.usersService.findOne(loginData.id);
    const PasswordResult = await bcrypt.compare(
      loginData.password,
      user.password,
    ); //비밀번호 검사
    if (PasswordResult) {
      user.password = undefined;
      return {
        user: user,
        accessToken: await this.getAccessToken(loginData.id),
        refreshToken: await this.getRefreshToken(),
      };
    } else {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async validate(loginData: loginDataDto) {
    const user = await this.usersService.findOne(loginData.id);
    if (user && (await bcrypt.compare(loginData.password, user.password))) {
      return user;
    }
    return null;
  }
  public async getAccessToken(id: string) {
    const token = this.jwtSercice.sign({ id: id });
    return token;
  }
  public async getRefreshToken() {
    const token = this.jwtSercice.sign({}, { expiresIn: '1d' });
    return token;
  }
  public async TestToken(loginData: loginDataDto) {
    if (loginData.accessToken === null) {
      if (loginData.refreshToken === null) {
        throw new HttpException(
          '리프레시토큰이없습니다',
          HttpStatus.BAD_REQUEST,
        );
      }
      const id = await this.usersService.findId(loginData);
      const newAccessToken = this.jwtSercice.sign({ id: id });
      return { accessToken: newAccessToken };
    } else {
      //액세스토큰은 있을때
      if (loginData.refreshToken === null) {
        const newRefreshToken = this.getRefreshToken();
        return { refreshToken: newRefreshToken };
      } else {
        return false;
      }
    }
  }
}
