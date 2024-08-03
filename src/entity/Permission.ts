import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { AppBaseEntity } from "./BaseEntity";

@Entity()
export class Permission extends AppBaseEntity {
  
  @Column({unique: true})
  name: string 
  @Column({nullable: true})
  label?: string 
  
  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[]
}