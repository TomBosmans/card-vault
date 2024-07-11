import { type Selectable, sql } from "kysely"
import type { DB } from "kysely-codegen/dist/db"
import type SelectQuery from "../types/select-query.type"
import mapOperatorExpression from "../utils/map-operator-expression.util"

export type Where<Table extends keyof DB> = Partial<{
  [Key in keyof Selectable<DB[Table]>]:
    | {
        $match?: Selectable<DB[Table]>[Key]
        $eq?: Selectable<DB[Table]>[Key] | null
        $ne?: Selectable<DB[Table]>[Key] | null
        $lt?: Selectable<DB[Table]>[Key] | null
        $lte?: Selectable<DB[Table]>[Key] | null
        $gt?: Selectable<DB[Table]>[Key] | null
        $gte?: Selectable<DB[Table]>[Key] | null
        $in?: Array<Selectable<DB[Table]>[Key]>
        $nin?: Array<Selectable<DB[Table]>[Key]>
      }
    | Selectable<DB[Table]>[Key]
    | null
}>

export default function whereClause<Table extends keyof DB>(where?: Where<Table>) {
  return (query: SelectQuery<Table>) => {
    if (!where) return query

    const attributes = Object.keys(where) as Array<keyof typeof where>
    for (const attribute of attributes) {
      if (typeof where[attribute] !== "object") {
        const value = where[attribute]
        // biome-ignore lint/style/noParameterAssign: it is ok
        query = (query as SelectQuery<Table>).where(
          // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
          attribute as any,
          // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
          mapOperatorExpression("$eq", value as any),
          value,
        )
      } else {
        // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
        const operators = Object.keys(where[attribute] as any) as Array<
          keyof (typeof where)[typeof attribute]
        >
        for (const operator of operators) {
          // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
          const value = (where?.[attribute] as any)?.[operator]
          if (value !== undefined) {
            if (operator === "$match") {
              // biome-ignore lint/style/noParameterAssign: it is ok
              query = (query as SelectQuery<Table>).where(
                // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
                attribute as any,
                // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
                mapOperatorExpression(operator as any, value as any),
                sql.val(`%${value}%`),
              )
            } else {
              // biome-ignore lint/style/noParameterAssign: it is ok
              query = (query as SelectQuery<Table>).where(
                // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
                attribute as any,
                // biome-ignore lint/suspicious/noExplicitAny: not worth typing out
                mapOperatorExpression(operator as any, value as any),
                value,
              )
            }
          }
        }
      }
    }

    return query
  }
}
