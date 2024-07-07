import type {
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import type { Logger } from "../logger/logger.factory"

type Server = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  Logger,
  ZodTypeProvider
>

export default Server
