import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import Category from "./Category";

import { v4 as uuid } from "uuid";

@Entity('videos')
class Video {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @Column()
    categoryId: number;

    @ManyToOne(type => Category, videos => Video, { eager: true, onUpdate: "CASCADE", onDelete: "SET NULL" })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export default Video