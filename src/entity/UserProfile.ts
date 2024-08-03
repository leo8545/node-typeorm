import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { AppBaseEntity } from "./BaseEntity"

@Entity()
export class UserProfile extends AppBaseEntity {
  
  @Column()
  address: string | null 
  @Column({
    nullable: true 
  })
  cnic?: string
  @Column({
    nullable: true 
  })
  bloodType?: string
  @Column({
    nullable: true 
  })
  isMarried?: boolean 

  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User
}