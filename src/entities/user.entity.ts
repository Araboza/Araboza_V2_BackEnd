import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @Column()
  @OneToMany(() => PostEntity, (post) => post.user)
  post : PostEntity
  
}
