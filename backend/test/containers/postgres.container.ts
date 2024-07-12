import { PostgreSqlContainer } from "@testcontainers/postgresql"
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql"
import { asFunction, asValue } from "awilix"
import configSchema from "src/config/config.schema"
import databaseFactory from "src/database/database.factory"
import migratorFactory from "src/migrator/migrator.factory"
import type Server from "src/server/server.type"

export type PostgresContainer = StartedPostgreSqlContainer
export default async function setupPostgresContainer(server: Server) {
  const config = server.diContainer.resolve("config")
  const postgresContainer = await new PostgreSqlContainer(
    `postgres:${config.postgres.version}`,
  ).start()

  server.diContainer.register({
    config: asValue(
      configSchema.parse({
        ...process.env,
        POSTGRES_USER: postgresContainer.getUsername(),
        POSTGRES_HOST: postgresContainer.getHost(),
        POSTGRES_PORT: postgresContainer.getPort(),
        POSTGRES_PASSWORD: postgresContainer.getPassword(),
        POSTGRES_DATABASE: postgresContainer.getDatabase(),
      }),
    ),
  })

  server.diContainer.register({
    db: asFunction(databaseFactory, {
      injectionMode: "PROXY",
      lifetime: "SINGLETON",
    }),
  })

  const migrator = server.diContainer.build(migratorFactory, {
    injectionMode: "PROXY",
  })
  await migrator.loadStructure()

  return postgresContainer
}
