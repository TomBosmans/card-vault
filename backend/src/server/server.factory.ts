import { fastifyAwilixPlugin as Awilix } from "@fastify/awilix"
import Swagger from "@fastify/swagger"
import Scalar from "@scalar/fastify-api-reference"
import { asValue } from "awilix"
import Fastify from "fastify"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { jsonSchemaTransform } from "fastify-type-provider-zod"
import configFactory from "src/config/config.factory"
import loggerFactory from "src/logger/logger.factory"
import router from "src/router"
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
  const config = configFactory()
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

  server.diContainer.register({ config: asValue(config) })
  server.diContainer.register({ logger: asValue(logger) })

  for (const route of router) route(server)

  return server
}
