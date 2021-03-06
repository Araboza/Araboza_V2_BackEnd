import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { User } from './user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext')
  contents: string;

  @Column()
  img: string;

  @Column()
  likeNum: number;

  @ManyToOne(() => User, (user) => user.post)
  user: User;

  @OneToOne(() => Like, (like) => like.post)
  like: Like;

  @Column('simple-array')
  tags: string[];

  @CreateDateColumn()
  createDate: Date;
}
