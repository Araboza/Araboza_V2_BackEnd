import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { register } from 'src/entities/register.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([register])],
  providers: [UsersService],
})
export class UsersModule {}
