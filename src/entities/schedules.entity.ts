import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, Timestamp } from "typeorm"
import {v4 as uuid} from "uuid"
import { Property } from "./properties.entity"
import { User } from "./users.entity"

@Entity()

export class Schedule_users_properties{

    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    date: Date

    @Column()
    hour: string

    @ManyToOne(type => Property, properties => properties.schedules)
    property: Property

    @ManyToOne(type => User, users => users.schedules, {
        eager: true
    })
    user: User

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

