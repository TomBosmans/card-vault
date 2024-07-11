import type { Updateable } from "kysely"
import type { DB } from "kysely-codegen/dist/db"
import * as R from "remeda"
import type Database from "src/database/database.type"
import whereClause, { type Where } from "../clauses/where.clause"

export type UpdateQueryParams<Table extends keyof DB> = {
  set: Updateable<DB[Table]>
  where: Where<Table>
}

export default class UpdateQuery<Table extends keyof DB> {
  constructor(private readonly db: Database) {}

  public build(table: Table, params: UpdateQueryParams<Table>, db: Database = this.db) {
    return R.pipe(
      db.updateTable(table),
      // biome-ignore lint/suspicious/noExplicitAny: is ok
      (eb) => eb.set(params.set as any),
      // biome-ignore lint/suspicious/noExplicitAny: is ok
      (eb) => whereClause(params.where)(eb as any) as any as typeof eb,
      (eb) => eb.returningAll(),
    )
  }
}
