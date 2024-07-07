import z from "zod"
import type { Config } from "./config/config.factory"
import healthRoute from "./health/health.route"
import type { Logger } from "./logger/logger.factory"
import serverFactory from "./server/server.factory"

declare module "@fastify/awilix" {
  interface Cradle {
    config: Config
    logger: Logger
  }
}

async function run() {
  const server = await serverFactory()

  healthRoute(server)

  server.route({
    url: "/",
    method: "GET",
    schema: {
      response: {
        200: z.string().url(),
      },
    },
    handler: async (request) => {
      const config = request.diScope.resolve("config")
      const logger = request.diScope.resolve("logger")
      logger.info("log from the root route")
      return config.postgres.url
    },
  })

  await server.ready()
  server.listen({ port: 3100, host: "0.0.0.0" }, (err) => {
    if (!err) return

    server.log.fatal(err)
    process.exit(1)
  })
}

void run()
