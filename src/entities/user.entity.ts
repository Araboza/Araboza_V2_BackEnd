import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  introduce: string;

  @Column()
  img : string;

  @Column()
  major : string;
  
}
