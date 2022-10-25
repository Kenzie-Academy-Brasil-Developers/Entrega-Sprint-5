import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import {v4 as uuid} from "uuid"
import { Schedule_users_properties } from "./schedules.entity"

@Entity()

export class User{
    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    isAdm: boolean

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Schedule_users_properties, schedule => schedule.user)
    schedules: Schedule_users_properties[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}