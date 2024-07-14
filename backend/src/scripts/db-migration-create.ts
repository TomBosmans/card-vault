#!/usr/bin/env node

import serverFactory from "src/server/server.factory"

async function run() {
  const server = await serverFactory()
  const migrator = server.diContainer.resolve("migrator")

  if (process.argv.length < 3) {
    console.log("Please provide a name for the migration.")
    process.exit(1)
  }

  const name = process.argv[2]
  await migrator.generateMigration(name)
  await migrator.db.destroy()
}

void run()
