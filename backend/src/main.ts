import Fastify from "fastify"
import loggerFactory from "./logger/logger.factory"

async function run() {
  const logger = loggerFactory()
  const app = Fastify({ logger })

  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      return "hello world"
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
