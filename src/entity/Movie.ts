import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AppBaseEntity } from "./BaseEntity";
import { MoviePerson } from "./MoviePerson";
import { Genre } from "./Genre";

export enum MPARating {
  G = 'g',
  PG = 'pg',
  PG13 = 'pg-13',
  R = 'r',
  NC17 = 'nc-17'
}

@Entity()
export class Movie extends AppBaseEntity {
  @Column()
  title: string 
  @Column({nullable: true, length: 4})
  releasedYear?: string 
  @Column({nullable: true})
  releasedDate?: Date 
  @Column({nullable: true})
  shortDesc?: string 
  @Column({nullable: true}) 
  duration?: number
  @Column({
    type: 'enum',
    enum: MPARating,
    nullable: true 
  })
  mpaRating?: MPARating 

  @OneToMany(() => MoviePerson, person => person.movie)
  persons: MoviePerson[]

  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable()
  genres: Genre[]
}