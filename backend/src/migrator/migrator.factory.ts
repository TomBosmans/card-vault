import type { Cradle } from "@fastify/awilix"
import Migrator from "./migrator"

export default function migratorFactory({ config, logger, db }: Cradle) {
  const migrator = new Migrator({
    db,
    logger,
    config,
    folder: "src/database",
  })

  return migrator
}
