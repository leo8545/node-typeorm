import "reflect-metadata"
import * as dotenv from "dotenv"
dotenv.config()
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { UserProfile } from "./entity/UserProfile"
import { Role } from "./entity/Role"
import { Permission } from "./entity/Permission"
import { Movie } from "./entity/Movie"
import { MoviePerson } from "./entity/MoviePerson"
import { MovieRole } from "./entity/MovieRole"
import { Person } from "./entity/Person"
import { Genre } from "./entity/Genre"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    synchronize: true,
    logging: false,
    entities: [
        User,
        UserProfile,
        Role,
        Permission,
        Person,
        Movie,
        MoviePerson,
        MovieRole,
        Genre
    ],
    migrations: [],
    subscribers: [],
})
