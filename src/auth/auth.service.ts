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

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
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
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new ConflictException();
    }
  }
  public async login(loginData: loginDataDto) {
    const hashPassword = await this.usersService.login(loginData);
    const Result = await bcrypt.compare(loginData.password, hashPassword);
  }
}
