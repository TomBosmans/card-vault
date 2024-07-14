#!/usr/bin/env node

import serverFactory from "src/server/server.factory"

async function run() {
  const server = await serverFactory()
  const migrator = server.diContainer.resolve("migrator")

  await migrator.migrateToLatest()
  await migrator.db.destroy()
}

void run()
