#!/usr/bin/env node

import migratorFactory from "src/migrator/migrator.factory"

async function run() {
  if (process.argv.length < 3) {
    console.log("Please provide a name for the migration.")
    process.exit(1)
  }

  const name = process.argv[2]
  const migrator = migratorFactory()
  await migrator.generateMigration(name)
  await migrator.db.destroy()
}

void run()
