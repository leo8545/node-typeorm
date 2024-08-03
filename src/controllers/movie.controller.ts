import { In } from "typeorm"
import { AppDataSource } from "../data-source"
import { Genre } from "../entity/Genre"
import { Movie } from "../entity/Movie"
import { MoviePerson } from "../entity/MoviePerson"
import { MovieRole } from "../entity/MovieRole"
import { Person } from "../entity/Person"

export class MovieController {
  static async findOne(req, res, next) {
    try {
      const {movieId} = req.params
      const repo = AppDataSource.getRepository(Movie)
      const movie = await repo.findOne({
        where: {
          id: movieId
        },
        relations: {
          persons: true,
        }
      })
      return res.json({
        data: movie 
      })
    } catch(e) {
      next(e)
    }
  }

  static async findAll(req, res, next) {
    try {
      const repo = AppDataSource.getRepository(Movie)
      const movies = await repo.find({
        relations: {
          persons: {
            person: true,
            role: true 
          },
          genres: true 
        }
      })
      const data = []
      if(movies.length) {
        for (let movie of movies) {
          let obj : any = {}
          obj.id = movie.id 
          obj.title = movie.title 
          obj.formattedTitle = `${movie.title} (${movie.releasedYear})`
          obj.shortDesc = movie.shortDesc
          obj.releasedYear = movie.releasedYear
          obj.mpaRating = movie.mpaRating?.toString().toUpperCase()
          obj.actors = []
          obj.directors = []
          obj.writers = []
          obj.genres = movie.genres?.map(g => ({
            id: g.id,
            name: g.name,
            label: g.label 
          }))
          for (let person of movie.persons) {
            let p : any = {
              id: person.person.id,
              fullName: person.person.firstName + " " + person.person.lastName,
            }
            switch(person.role.name) {
              case "actor":
                p.characterName = person.characterName
                obj.actors.push(p)
              break;
              case "director":
                obj.directors.push(p)
              break;
              case "writer":
                obj.writers.push(p)
              break;
            }
          }
          data.push(obj)
        }
      }
      return res.json({
        data: data
      })
    } catch(e) {
      next(e)
    }
  }

  static async create(req, res, next) {
    try {
      const {title, releasedYear} = req.body
      const repo = AppDataSource.getRepository(Movie)
      const movie = new Movie()
      movie.title = title 
      movie.releasedYear = releasedYear
      await repo.save(movie)
      return res.json({
        data: movie
      })
    } catch(e) {
      next(e)
    }
  }

  static async createMoviePerson(req, res, next) {
    try {
      const { personId, movieId, characterName, roleId } = req.body
      const repo = AppDataSource.getRepository(MoviePerson)
      const movie = await AppDataSource.manager.findOneBy(Movie, {id: movieId})
      const person = await AppDataSource.manager.findOneBy(Person, {id: personId})
      const role = await AppDataSource.manager.findOneBy(MovieRole, {id: roleId})
      const doc = new MoviePerson()
      doc.characterName = characterName
      doc.movie = movie 
      doc.person = person 
      doc.role = role 
      await repo.save(doc)
      return res.json({
        data: doc 
      })
    } catch(e) {
      next(e)
    }
  }

  static async createMovieRole(req, res, next) {
    try {
      const {name, label} = req.body
      const repo = AppDataSource.getRepository(MovieRole)
      const role = new MovieRole()
      role.name = name 
      role.label = label 
      await repo.save(role)
      return res.json({
        data: role 
      })
    } catch(e) {
      next(e)
    }
  }

  static async updateMoviePerson(req, res, next) {
    try {
      const { id } = req.params 
      const { roleId } = req.body
      const role = await AppDataSource.manager.findOne(MovieRole, {
        where: {
          id: roleId 
        }
      })
      const moviePerson = await AppDataSource.manager.findOne(MoviePerson, {
        where: {
          id
        }
      })
      moviePerson.role = role 
      await AppDataSource.manager.save(moviePerson)
      return res.json({
        data: moviePerson
      })
    } catch(e) {
      next(e)
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const {movieId} = req.params 
      const {shortDesc, genreIds, mpaRating} = req.body
      const movie = await AppDataSource.manager.findOneBy(Movie, {id: movieId})
      if(genreIds) {
        const genres = await AppDataSource.manager.find(Genre, {
          where: {
            id: In(genreIds)
          }
        })
        movie.genres = genres
      }
      movie.shortDesc = shortDesc
      movie.mpaRating = mpaRating
      await AppDataSource.manager.save(movie)
      return res.json({
        data: movie 
      })
    } catch(e) {
      next(e)
    }
  }

  static async createGenre(req, res, next) {
    try {
      const {name, label} = req.body
      const repo = AppDataSource.getRepository(Genre)
      const genre = new Genre()
      genre.name = name 
      genre.label = label 
      await repo.save(genre)
      return res.json({
        data: genre 
      })
    } catch(e) {
      next(e)
    }
  }
}