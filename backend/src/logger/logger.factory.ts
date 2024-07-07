import pino from "pino"
import stdoutTransport from "./stdout.transport"

export type Logger = ReturnType<typeof loggerFactory>

export default function loggerFactory() {
  const logger = pino(
    { redact: { paths: ["password"], censor: "***" } },
    pino.transport({ targets: [stdoutTransport] }),
  )
  return logger
}
