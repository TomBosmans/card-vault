import assert from "node:assert"
import { after, before, describe, it } from "node:test"
import type Server from "src/server/server.type"
import setupPostgresContainer, { type PostgresContainer } from "test/containers/postgres.container"
import testServerFactory from "test/factories/test-server.factory"
import UserFactory from "test/factories/user.factory"
import jsonify from "test/utils/jsonify"

describe("GET /users", async () => {
  let server: Server
  let postgresContainer: PostgresContainer

  before(async () => {
    server = await testServerFactory()
    postgresContainer = await setupPostgresContainer(server)
  })

  after(async () => {
    await server.diContainer.resolve("db").destroy()
    await postgresContainer.stop()
  })

  it("responds with status code 200", async () => {
    const response = await server.inject({ method: "GET", url: "/users" })
    assert.equal(response.statusCode, 200)
  })

  it("returns all users", async () => {
    const users = await server.diContainer.build(UserFactory).createMany(4)
    const response = await server.inject({ method: "GET", url: "/users" })
    assert.deepEqual(response.json(), jsonify(users))
  })
})
