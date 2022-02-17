import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userData: CreateUserDto) {
    console.log(userData);
    const User = await this.userRepository.create(userData);
    await this.userRepository.save(User);
    return User;
  }
  async findId(userData: CreateUserDto) {
    const result = this.userRepository.find({ id: userData.id });
    return result;
  }
}
