import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Like{
    @PrimaryGeneratedColumn()
    id : string;

    @OneToOne(() => User, (user) => user.like)
    user : User;

    @OneToOne(() => PostEntity , (post) => post.like)
    post : PostEntity;
}