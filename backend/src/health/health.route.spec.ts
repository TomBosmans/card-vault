import assert from "node:assert"
import { describe, it } from "node:test"
import serverTestFactory from "../server/server.test-factory"
import healthRoute from "./health.route"

describe("GET /health", () => {
  it("responds with status 200", async () => {
    const server = serverTestFactory()
    healthRoute(server)

    const response = await server.inject({
      method: "GET",
      url: "/health",
    })

    assert.equal(response.statusCode, 200)
  })

  it("responds with body { status: ok }", async () => {
    const server = serverTestFactory()
    healthRoute(server)

    const response = await server.inject({
      method: "GET",
      url: "/health",
    })

    assert.deepEqual(JSON.parse(response.body), { status: "ok" })
  })
})
