import CountQuery from "./common/count.query"
import DeleteQuery from "./common/delete.query"
import InsertQuery from "./common/insert.query"
import SelectQuery from "./common/select.query"
import UpdateQuery from "./common/update.query"

const queries = {
  countQuery: CountQuery,
  deleteQuery: DeleteQuery,
  insertQuery: InsertQuery,
  selectQuery: SelectQuery,
  updateQuery: UpdateQuery,
} as const

export default queries
