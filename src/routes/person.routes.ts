import * as express from "express"
import { PersonController } from "../controllers/person.controller"
const router = express.Router()

router.post('/', PersonController.create)

export default router 