import * as dotenv from "dotenv"
import { AppDataSource } from "./data-source"
import * as express from "express"
import { routes } from "./routes/routes"

dotenv.config()

const app = express()
app.use(express.json())

routes(app)

AppDataSource.initialize().then(res => {
    app.listen(4000, () => {
        console.log(`Listening at http://localhost:4000/`)
    })
})