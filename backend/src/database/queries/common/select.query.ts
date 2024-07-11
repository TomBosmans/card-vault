import type { DB } from "kysely-codegen/dist/db"
import * as R from "remeda"
import type Database from "src/database/database.type"
import orderByClause, { type OrderBy } from "../clauses/ordery-by.clause"
import selectClause, { type Select } from "../clauses/select.clause"
import whereClause, { type Where } from "../clauses/where.clause"

export type SelectQueryParams<Table extends keyof DB> = {
  select?: Select<Table>
  orderBy?: OrderBy<Table>
  where?: Where<Table>
}

export default class SelectQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: SelectQueryParams<Table> = {}, eb: Database = this.db) {
    return R.pipe(
      eb.selectFrom(table),
      selectClause(params.select),
      orderByClause(params.orderBy),
      whereClause(params.where),
    )
  }
}
