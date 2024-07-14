import type { Constructor } from "awilix"
import z from "zod"
import type { Config } from "./config/config.factory"
import type Database from "./database/database.type"
import type queries from "./database/queries"
import type { Logger } from "./logger/logger.factory"
import type Migrator from "./migrator/migrator"
import type repositories from "./repositories"
import serverFactory from "./server/server.factory"

type Instances<T extends Record<string, Constructor<unknown>>> = {
  [K in keyof T]: InstanceType<T[K]>
}

type ServerCradle = Instances<typeof queries> &
  Instances<typeof repositories> & {
    enableLogger: boolean
    config: Config
    logger: Logger
    db: Database
    migrator: Migrator
  }

declare module "@fastify/awilix" {
  interface Cradle extends ServerCradle {}
}

async function run() {
  const server = await serverFactory()

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
