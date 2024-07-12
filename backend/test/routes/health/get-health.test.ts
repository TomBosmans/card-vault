import assert from "node:assert"
import { before, describe, it } from "node:test"
import type { Response } from "light-my-request"
import type Server from "src/server/server.type"
import testServerFactory from "test/factories/test-server.factory"

describe("GET /health", async () => {
  let server: Server
  let response: Response

  before(async () => {
    server = await testServerFactory()
    response = await server.inject({ method: "GET", url: "/health" })
  })

  it("responds with status 200", () => assert.equal(response.statusCode, 200))
  it("responds with body { status: ok }", () => assert.deepEqual(response.json(), { status: "ok" }))
})
