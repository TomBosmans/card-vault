import type { ExpressionBuilder, Kysely } from "kysely"
import type { DB } from "kysely-codegen/dist/db"

type EB<Table extends keyof DB> = ExpressionBuilder<DB, Table> | Kysely<DB>
export default EB
