import type { DB } from "kysely-codegen/dist/db"
import * as R from "remeda"
import type SelectQuery from "../types/select-query.type"

export type OrderBy<Table extends keyof DB> = Partial<Record<keyof DB[Table], "asc" | "desc">>

export default function orderByClause<Table extends keyof DB>(orderBy?: OrderBy<Table>) {
  return (query: SelectQuery<Table>) => {
    if (!orderBy) return query

    const attributes = R.keys(orderBy)
    for (const attribute of attributes) {
      // biome-ignore lint/suspicious/noExplicitAny: correctly typed with as in the end
      // biome-ignore lint/style/noParameterAssign: stuff
      query = query.orderBy(attribute as any, orderBy[attribute])
    }
    return query as SelectQuery<Table>
  }
}
