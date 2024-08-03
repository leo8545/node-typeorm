import { Column, Entity, Table } from "typeorm";
import { AppBaseEntity } from "./BaseEntity";

@Entity()
export class Person extends AppBaseEntity {
  @Column({nullable: true})
  firstName: string 
  @Column({nullable: true})
  lastName: string 
  @Column({nullable: true})
  fullName: string 
  @Column({nullable: true})
  dateOfBirth: Date 
  @Column({nullable: true})
  bio?: string 
}