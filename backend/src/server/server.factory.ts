import Fastify, {
  type FastifyBaseLogger,
  type FastifyInstance,
  type RawReplyDefaultExpression,
  type RawRequestDefaultExpression,
  type RawServerDefault,
} from "fastify"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import type { ZodTypeProvider } from "fastify-type-provider-zod"

export type Server = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>

type Params = {
  logger: FastifyBaseLogger
}

export default function serverFactory({ logger }: Params): Server {
  const server = Fastify({ logger })
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  return server
}
