import type { Insertable } from "kysely"
import type { DB } from "kysely-codegen/dist/db"
import type Database from "src/database/database.type"

export type InsertOneQueryParams<Table extends keyof DB> = Insertable<DB[Table]>
export type InsertManyQueryParams<Table extends keyof DB> = Array<Insertable<DB[Table]>>
export type InsertQueryParams<Table extends keyof DB> =
  | InsertOneQueryParams<Table>
  | InsertManyQueryParams<Table>

export default class InsertQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: InsertQueryParams<Table>, db: Database = this.db) {
    return db.insertInto(table).values(params).returningAll()
  }
}
