import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"
import type { DB } from "kysely-codegen/dist/db"
import pg from "pg"
import type { Config } from "src/config/config.factory"
import type { Logger } from "src/logger/logger.factory"

type Params = {
  config: Config
  logger: Logger
  enableLogger?: boolean
}

export default function databaseFactory({ config, logger, enableLogger = true }: Params) {
  const dialect = new PostgresDialect({
    pool: new pg.Pool({
      database: config.postgres.database,
      host: config.postgres.host,
      user: config.postgres.user,
      port: config.postgres.port,
      password: config.postgres.password ?? undefined,
      max: config.postgres.pool.max,
    }),
  })

  const db = new Kysely<DB>({
    dialect,
    plugins: [new CamelCasePlugin()],
    log: (event) => {
      if (!enableLogger) return
      if (event.level !== "query") return

      logger.info(
        {
          duration: event.queryDurationMillis,
          sql: event.query.sql,
          parameters: event.query.parameters,
        },
        "sql query",
      )
    },
  })

  return db
}
