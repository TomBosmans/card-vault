import Fastify from "fastify"

async function run() {
  const app = Fastify()

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
