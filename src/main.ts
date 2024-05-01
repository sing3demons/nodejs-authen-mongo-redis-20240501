import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import helmet from 'helmet'
import Context from './core/context/context.js'
import UserRouter from './user/user.route.js'
import MongoService from './core/mongo/index.js'
import Logger from './core/logger/index.js'
import { TypeRoute } from './core/router/typed-router.js'
import { globalErrorHandler, httpLogger } from './middleware/index.js'
import config from './config.js'
import AuthRouter from './auth/auth.route.js'
import { RedisService } from './core/redis/index.js'

const port = config.port

const app = express()

async function main() {
  const logger = new Logger()
  const mongoService = new MongoService()
  await mongoService.connect()

  const redisClient = new RedisService(logger)
  await redisClient.connect()

  const client = mongoService.getClient()
  const route = new TypeRoute()

  app.use((req, _res, next) => {
    if (!req.headers['x-session']) {
      req.headers['x-session'] = `default-${uuidv4()}`
    }
    Context.bind(req)
    next()
  })
  app.use(helmet())
  app.use(httpLogger)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.get('/healthz', (_req, res) => {
    res.status(200).json({ message: 'OK' })
  })

  new AuthRouter(route, client, redisClient, logger).register(app)
  new UserRouter(route, client, logger).register(app)

  app.use(globalErrorHandler)
  const server = app.listen(port, () => logger.info(`Server running on port ${port}`))

  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server')
    server.close(() => process.exit(0))
  })

  process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server')
    server.close(() => process.exit(0))
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
