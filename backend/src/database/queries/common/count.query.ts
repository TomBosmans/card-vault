import { sql } from "kysely"
import type { DB } from "kysely-codegen/dist/db"
import type Database from "src/database/database.type"
import type SelectQuery from "src/database/queries/types/select-query.type"

export default class CountQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, eb: SelectQuery<Table> = this.db.selectFrom(table)) {
    return eb.clearSelect().clearOrderBy().select(sql<number>`count(*)::int`.as("count"))
  }
}
