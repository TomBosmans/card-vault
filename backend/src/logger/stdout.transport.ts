import type { TransportSingleOptions } from "pino"
import type { PrettyOptions } from "pino-pretty"

const stdoutTransport = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:HH:MM:ss",
    ignore: "pid,hostname",
  } as PrettyOptions,
} as TransportSingleOptions

export default stdoutTransport
