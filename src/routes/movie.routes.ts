import * as express from "express"
import { MovieController } from "../controllers/movie.controller"
const router = express.Router()

router.get('/', MovieController.findAll)
router.get('/:movieId', MovieController.findOne)
router.post('/', MovieController.create)
router.put('/:movieId', MovieController.updateMovie)

router.post('/create-movie-person', MovieController.createMoviePerson)
router.put('/update-movie-person/:id', MovieController.updateMoviePerson)

router.post('/create-movie-role', MovieController.createMovieRole)

router.post('/create-genre', MovieController.createGenre)

export default router 