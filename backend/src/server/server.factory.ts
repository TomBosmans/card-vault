import { fastifyAwilixPlugin as Awilix } from "@fastify/awilix"
import Swagger from "@fastify/swagger"
import Scalar from "@scalar/fastify-api-reference"
import { type Constructor, asClass, asFunction, asValue } from "awilix"
import Fastify from "fastify"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { jsonSchemaTransform } from "fastify-type-provider-zod"
import configFactory from "src/config/config.factory"
import databaseFactory from "src/database/database.factory"
import queries from "src/database/queries"
import loggerFactory from "src/logger/logger.factory"
import migratorFactory from "src/migrator/migrator.factory"
import repositories from "src/repositories"
import router from "src/routes"
import packageJSON from "../../package.json"
import type Server from "./server.type"

type Params = {
  enableLogger?: boolean
  enableSwagger?: boolean
}

export default async function serverFactory({
  enableLogger = true,
  enableSwagger = true,
}: Params = {}): Promise<Server> {
  const logger = loggerFactory()
  const server = Fastify({ logger: enableLogger && logger })

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  if (enableSwagger) {
    await server.register(Swagger, {
      transform: jsonSchemaTransform,
      openapi: {
        info: {
          title: packageJSON.name,
          description: packageJSON.description,
          version: packageJSON.version,
        },
      },
    })

    await server.register(Scalar, { routePrefix: "/docs" })
  }

  await server.register(Awilix, {
    injectionMode: "CLASSIC",
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
  })

  server.diContainer.register({ enableLogger: asValue(enableLogger) })
  server.diContainer.register({ logger: asValue(logger) })
  server.diContainer.register({
    config: asFunction(configFactory, { injectionMode: "PROXY", lifetime: "SINGLETON" }),
  })
  server.diContainer.register({
    db: asFunction(databaseFactory, { injectionMode: "PROXY", lifetime: "SINGLETON" }),
  })

  server.diContainer.register({
    migrator: asFunction(migratorFactory, { injectionMode: "PROXY", lifetime: "SINGLETON" }),
  })

  for (const [key, value] of Object.entries(queries)) {
    server.diContainer.register({
      [key]: asClass(value as Constructor<unknown>, { lifetime: "SINGLETON" }),
    })
  }

  for (const [key, value] of Object.entries(repositories)) {
    server.diContainer.register({
      [key]: asClass(value as Constructor<unknown>, { lifetime: "SINGLETON" }),
    })
  }

  for (const route of router) route(server)

  return server
}
