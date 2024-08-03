import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from "typeorm"
import { UserProfile } from "./UserProfile"
import { AppBaseEntity } from "./BaseEntity"

@Entity()
export class User extends AppBaseEntity {

    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column()
    age: number
    @Column("simple-json")
    meta: {fullName?: string}

    @OneToOne(() => UserProfile, profile => profile.user)
    profile: UserProfile
}
