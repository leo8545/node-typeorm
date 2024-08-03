import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { AppBaseEntity } from "./BaseEntity";
import { Movie } from "./Movie";
import { Person } from "./Person";
import { MovieRole } from "./MovieRole";

@Entity()
export class MoviePerson extends AppBaseEntity {
  @Column({nullable: true})
  characterName?: string 

  @ManyToOne(() => Movie)
  @JoinTable()
  movie: Movie

  @ManyToOne(() => Person)
  @JoinTable()
  person: Person

  @ManyToOne(() => MovieRole)
  @JoinTable()
  role: MovieRole
}