import movieRoutes from "./movie.routes"
import personRoutes from "./person.routes"

export function routes(app) {
  app.get('/', (req, res, next) => {
    res.json({
      message: 'Welcome home'
    })
  })
  app.use('/movies', movieRoutes)
  app.use('/persons', personRoutes)
  app.use('*', (req, res) => {
    res.status(404).json({
      error: {
        statusCode: 404,
        message: 'Route not found ' + req.method + ": " + req.originalUrl
      }
    })
  })
  app.use((err, req, res, next) => {
    res.status(400).json({
      error: {
        statusCode: 400,
        name: err?.name,
        message: err?.message ?? err.toString()
      }
    })
  })
}