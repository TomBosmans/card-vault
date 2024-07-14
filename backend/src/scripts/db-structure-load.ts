#!/usr/bin/env node

import { sql } from "kysely"
import serverFactory from "src/server/server.factory"

async function run() {
  const server = await serverFactory()
  const migrator = server.diContainer.resolve("migrator")
  const database = migrator.config.postgres.database

  sql`create table ${database}`.execute(migrator.db)

  await migrator.loadStructure()
  await migrator.db.destroy()
}

void run()
