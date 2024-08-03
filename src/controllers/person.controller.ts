import { AppDataSource } from "../data-source"
import { Person } from "../entity/Person"

export class PersonController {
  static async create(req, res, next) {
    try {
      const { firstName, lastName } = req.body
      const repo = AppDataSource.getRepository(Person)
      const person = new Person()
      person.firstName = firstName
      person.lastName = lastName
      await repo.save(person)
      return res.json({
        data: person 
      })
    } catch(e) {
      next(e)
    }
  }
}