import Fastify from "fastify"
import loggerFactory, { type Logger } from "./logger/logger.factory"
import configFactory, { type Config } from "./config/config.factory"
import { diContainerClassic, fastifyAwilixPlugin } from "@fastify/awilix"
import { asValue } from "awilix"

async function run() {
  const logger = loggerFactory()
  const config = configFactory()
  const app = Fastify({ logger })

  await app.register(fastifyAwilixPlugin, {
    injectionMode: "CLASSIC",
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
  })

  diContainerClassic.register({ config: asValue(config) })
  diContainerClassic.register({ logger: asValue(logger) })

  app.route({
    url: "/",
    method: "GET",
    handler: async (request) => {
      const config = request.diScope.resolve<Config>("config")
      const logger = request.diScope.resolve<Logger>("logger")
      logger.info("log from the root route")
      return config.postgres.url
    },
  })

  await app.ready()
  app.listen({ port: 3100, host: "0.0.0.0" }, (err) => {
    if (!err) return

    app.log.fatal(err)
    process.exit(1)
  })
}

void run()
