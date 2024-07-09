import child_process from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import util from "node:util"
import {
  FileMigrationProvider,
  Migrator as KMigrator,
  type MigrationResultSet,
  type MigratorProps,
} from "kysely"
import type { Config } from "src/config/config.factory"
import type Database from "src/database/database.type"
import type { Logger } from "src/logger/logger.factory"

type Params = Omit<MigratorProps, "provider"> & {
  logger: Logger
  config: Config
  folder: string
}

export default class Migrator extends KMigrator {
  public log: Logger
  public db: Database
  public config: Config
  private migrationFolder: string
  private folder: string
  private templateFolder: string
  private templateFile: Buffer

  constructor({ logger, config, folder, ...params }: Params) {
    const migrationFolder = path.resolve(`${folder}/migrations`)
    const provider = new FileMigrationProvider({
      path,
      migrationFolder,
      fs: fs.promises,
    })
    super({ ...params, provider })
    this.db = params.db as Database
    this.log = logger
    this.config = config
    this.folder = path.resolve(folder)
    this.migrationFolder = migrationFolder
    this.templateFolder = path.resolve(import.meta.dirname, "./templates")
    this.templateFile = fs.readFileSync(`${this.templateFolder}/migration.template`)
  }

  public async migrateTo(target: string) {
    const result = await super.migrateTo(target)
    this.logMigrationResult(result)
    await this.generateTypes()
    await this.generateStructure()
    return result
  }

  public async migrateDown() {
    const result = await super.migrateDown()
    super.migrateTo
    this.logMigrationResult(result)
    await this.generateTypes()
    await this.generateStructure()
    return result
  }

  public async migrateToLatest() {
    const result = await super.migrateToLatest()
    this.logMigrationResult(result)
    await this.generateTypes()
    await this.generateStructure()
    return result
  }

  public async migrateUp() {
    const result = await super.migrateUp()
    this.logMigrationResult(result)
    await this.generateTypes()
    await this.generateStructure()
    return result
  }

  public async generateTypes() {
    await this.exec(`DATABASE_URL=${this.config.postgres.url} kysely-codegen --camel-case`)
  }

  public async generateStructure() {
    await this.exec(`
      pg_dump ${this.config.postgres.url} --no-owner --schema-only -U postgres > ${this.folder}/structure.sql
    `)

    await this.exec(`
      pg_dump ${this.config.postgres.url} --no-owner -t kysely_migration -t kysely_migration_lock --data-only > ${this.folder}/data.sql
    `)
  }

  public logMigrationResult({ results = [], error }: MigrationResultSet) {
    for (const result of results) {
      if (result.status === "Success") {
        this.log.info(`migration "${result.migrationName}" was executed successfully`)
      } else if (result.status === "Error") {
        this.log.error(`failed to execute migration "${result.migrationName}"`)
      }
    }

    if (error) {
      this.log.error("failed to migrate")
      this.log.error(error)
      process.exit(1)
    }
  }

  public async generateMigration(name: string) {
    const dateStr = new Date().toISOString().replace(/[-:]/g, "").split(".")[0]
    const fileName = `${this.migrationFolder}/${dateStr}-${name}.ts`

    try {
      if (!fs.lstatSync(this.migrationFolder).isDirectory()) fs.mkdirSync(this.migrationFolder)
    } catch {
      fs.mkdirSync(this.migrationFolder)
    }

    fs.writeFileSync(fileName, this.templateFile)
    this.log.info(`Created Migration: ${fileName.split("/").pop()}`)
  }

  public async loadStructure() {
    await this.exec(
      `
      PGPASSWORD=${this.config.postgres.password}\
      psql -U ${this.config.postgres.user}\
           -h ${this.config.postgres.host}\
           -p ${this.config.postgres.port}\
           ${this.config.postgres.database} < ${path.resolve(this.folder, "structure.sql")}
    `,
      { silent: false },
    )

    await this.exec(
      `
      PGPASSWORD=${this.config.postgres.password}\
      psql -U ${this.config.postgres.user}\
           -h ${this.config.postgres.host}\
           -p ${this.config.postgres.port}\
           ${this.config.postgres.database} < ${path.resolve(this.folder, "data.sql")}
    `,
      { silent: true },
    )
  }

  private async exec(command: string, { silent = false } = {}) {
    const exec = util.promisify(child_process.exec)
    const { stdout, stderr } = await exec(command)

    if (stdout && !silent) this.log.info(stdout)
    if (stderr) this.log.info(stderr)
  }
}
