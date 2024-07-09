#!/usr/bin/env node

import migratorFactory from "src/migrator/migrator.factory"

async function run() {
  const migrator = migratorFactory()
  await migrator.migrateDown()
  await migrator.db.destroy()
}

void run()
