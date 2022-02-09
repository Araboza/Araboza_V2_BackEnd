import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { register } from 'src/entities/register.entity';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService],
})
export class UsersModule {}
