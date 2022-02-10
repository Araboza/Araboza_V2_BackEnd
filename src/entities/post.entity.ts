import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  @ManyToOne(() => User, (user) => user.post)
  user: User;
}
