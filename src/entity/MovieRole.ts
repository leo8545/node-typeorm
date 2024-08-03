import { Column, Entity } from "typeorm";
import { AppBaseEntity } from "./BaseEntity";

@Entity()
export class MovieRole extends AppBaseEntity {
  @Column({
    unique: true 
  })
  name: string 
  @Column({nullable: true})
  label?: string
}