import { Column, Entity, ManyToMany } from "typeorm";
import { AppBaseEntity } from "./BaseEntity";
import { Movie } from "./Movie";

@Entity()
export class Genre extends AppBaseEntity {
  @Column({unique: true})
  name: string 
  @Column()
  label: string 

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[]
}