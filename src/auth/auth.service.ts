import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  public async register(registerData) {
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
  }
}
