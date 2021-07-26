import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    json() {
        return {
            "id": this.id,
            "name": this.name,
            "username": this.username,
            "email": this.email,
            "created_at": this.created_at,
            "updated_at": this.updated_at
        }
    }
}

export default User