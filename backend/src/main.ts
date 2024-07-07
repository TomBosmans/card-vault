import Fastify from "fastify"
import loggerFactory from "./logger/logger.factory"
import configFactory from "./config/config.factory"

async function run() {
  const logger = loggerFactory()
  const config = configFactory()
  const app = Fastify({ logger })

  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      return "hello world"
    },
  })

  await app.ready()

  app.log.info(`database connection can be found on: ${config.postgres.url}`)
  app.listen({ port: 3100, host: "0.0.0.0" }, (err) => {
    if (!err) return

    app.log.fatal(err)
    process.exit(1)
  })
}

void run()
