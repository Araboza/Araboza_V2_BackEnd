import { Entity, Column, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Like } from './like.entity';
import { PostEntity } from './post.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryColumn()
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

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;
}
