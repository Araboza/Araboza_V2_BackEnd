import { IsString } from 'class-validator';

export class loginDataDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
