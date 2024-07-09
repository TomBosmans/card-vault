import configFactory from "src/config/config.factory"
import databaseFactory from "src/database/database.factory"
import loggerFactory from "src/logger/logger.factory"
import Migrator from "./migrator"

export default function migratorFactory() {
  const config = configFactory()
  const logger = loggerFactory()
  const db = databaseFactory({ config, logger })

  const migrator = new Migrator({
    db,
    logger,
    config,
    folder: "src/database",
  })

  return migrator
}
