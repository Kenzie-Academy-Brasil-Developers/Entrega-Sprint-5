import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import {v4 as uuid} from "uuid"
import { Property } from "./properties.entity"

@Entity()

export class Category{
    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @OneToMany(type => Property, prop => prop.category, {
        eager: true
    })
    properties: Property[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}