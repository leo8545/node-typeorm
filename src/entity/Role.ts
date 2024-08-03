import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permission";
import { AppBaseEntity } from "./BaseEntity";

@Entity()
export class Role extends AppBaseEntity {
  
  @Column({unique: true}) 
  name: string 
  @Column({nullable: true})
  label?: string 

  @ManyToMany(() => Permission, perm => perm.roles)
  @JoinTable()
  permissions: Permission[]
}