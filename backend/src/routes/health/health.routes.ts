import type Server from "src/server/server.type"
import { z } from "zod"

const OK = "ok" as const

export default function healthRoutes(server: Server) {
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
