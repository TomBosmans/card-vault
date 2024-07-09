import type { Kysely } from "kysely"
import type { DB } from "kysely-codegen/dist/db"

type Database = Kysely<DB>
export default Database
