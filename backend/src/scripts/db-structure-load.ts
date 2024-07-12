#!/usr/bin/env node

import { sql } from "kysely"
import migratorFactory from "src/migrator/migrator.factory"

async function run() {
  const migrator = migratorFactory()
  const database = migrator.config.postgres.database

  sql`create table ${database}`.execute(migrator.db)

  await migrator.loadStructure()
  await migrator.db.destroy()
}

void run()
