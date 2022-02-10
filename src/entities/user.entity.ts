import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Like } from './like.entity';
import { PostEntity } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  introduce: string;

  @Column()
  img: string;

  @Column('simple-array')
  major: string[];

  @OneToMany(() => PostEntity, (post) => post.user)
  post: PostEntity[];

  @OneToOne(() => Like, (like) => like.user)
  like: Like;
}
