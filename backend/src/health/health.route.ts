import { z } from "zod"
import type { Server } from "../server/server.factory"

const OK = "ok" as const

export default function healthRoute(server: Server) {
  return server.route({
    url: "/health",
    method: "GET",
    schema: {
      response: {
        200: z.object({ status: z.literal(OK) }),
      },
    },
    handler: () => {
      return { status: OK }
    },
  })
}
