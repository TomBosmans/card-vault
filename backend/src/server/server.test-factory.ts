import Fastify from "fastify"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"

export default function serverTestFactory() {
  const server = Fastify({ logger: false })
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  return server
}
