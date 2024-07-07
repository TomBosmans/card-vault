import assert from "node:assert"
import { describe, it } from "node:test"
import loggerFactory from "../logger/logger.factory"
import serverFactory from "../server/server.factory"
import healthRoute from "./health.route"

describe("GET /health", () => {
  it("responds with status 200", async () => {
    const logger = loggerFactory()
    const server = serverFactory({ logger })
    healthRoute(server)

    const response = await server.inject({
      method: "GET",
      url: "/health",
    })

    assert.equal(response.statusCode, 200)
  })

  it("responds with body { status: ok }", async () => {
    const logger = loggerFactory()
    const server = serverFactory({ logger })
    healthRoute(server)

    const response = await server.inject({
      method: "GET",
      url: "/health",
    })

    assert.deepEqual(JSON.parse(response.body), { status: "ok" })
  })
})
