import type { DB } from "kysely-codegen/dist/db"
import type SelectQuery from "../types/select-query.type"

export type Select<Table extends keyof DB> = Array<keyof DB[Table]>

export default function selectClause<Table extends keyof DB>(select?: Select<Table>) {
  return (query: SelectQuery<Table>) => {
    // biome-ignore lint/suspicious/noExplicitAny: type is set correctly with as
    return (select ? query.select(select as any) : query.selectAll()) as SelectQuery<Table>
  }
}
