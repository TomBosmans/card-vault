import assert from "node:assert"
import { describe, it } from "node:test"
import serverTestFactory from "../server/server.test-factory"

describe("GET /health", () => {
  it("responds with status 200", async () => {
    const server = await serverTestFactory()

    const response = await server.inject({
      method: "GET",
      url: "/health",
    })

    assert.equal(response.statusCode, 200)
  })

  it("responds with body { status: ok }", async () => {
    const server = await serverTestFactory()

    const response = await server.inject({
      method: "GET",
      url: "/health",
    })

    assert.deepEqual(response.json(), { status: "ok" })
  })
})
