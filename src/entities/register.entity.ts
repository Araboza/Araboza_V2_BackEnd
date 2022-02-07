import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class register {
    
    @PrimaryGeneratedColumn()
    email : string;

    @Column()
    password : string;

    @Column()
    nickname : string;

    @Column()
    introduce : string;

}