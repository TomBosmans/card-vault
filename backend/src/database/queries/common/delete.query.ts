import type { DB } from "kysely-codegen/dist/db"
import * as R from "remeda"
import type Database from "src/database/database.type"
import whereClause, { type Where } from "../clauses/where.clause"

export type DeleteQueryParams<Table extends keyof DB> = {
  where?: Where<Table>
}

export default class DeleteQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: DeleteQueryParams<Table>, db: Database = this.db) {
    return R.pipe(
      db.deleteFrom(table),
      // biome-ignore lint/suspicious/noExplicitAny: type is set correct with as
      (eb) => whereClause(params.where)(eb as any) as any as typeof eb,
      (eb) => eb.returningAll(),
    )
  }
}
