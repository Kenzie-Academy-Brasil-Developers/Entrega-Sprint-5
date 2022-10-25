import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import {v4 as uuid} from "uuid"
import { Adress } from "./adresses.entity"
import { Schedule_users_properties } from "./schedules.entity"
import { Category } from "./categories.entitites"

@Entity()

export class Property{
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({ default: false })
    sold: boolean

    @Column()
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Adress, {
        eager: true
    })@JoinColumn()
    address: Adress

    @OneToMany(type => Schedule_users_properties, schedule => schedule.property, {
        eager: true
    })
    schedules: Schedule_users_properties[]

    @ManyToOne(type => Category, categories => categories.properties)
    category: Category

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

}