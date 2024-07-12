import type Database from "src/database/database.type"
import type CountQuery from "src/database/queries/common/count.query"
import type DeleteQuery from "src/database/queries/common/delete.query"
import type { DeleteQueryParams } from "src/database/queries/common/delete.query"
import type InsertQuery from "src/database/queries/common/insert.query"
import type {
  InsertManyQueryParams,
  InsertOneQueryParams,
} from "src/database/queries/common/insert.query"
import type SelectQuery from "src/database/queries/common/select.query"
import type { SelectQueryParams } from "src/database/queries/common/select.query"
import type UpdateQuery from "src/database/queries/common/update.query"
import type { UpdateQueryParams } from "src/database/queries/common/update.query"
import userSchema from "../schemas/user.schema"

export default class UserRepository {
  constructor(
    private readonly db: Database,
    private readonly selectQuery: SelectQuery<"users">,
    private readonly insertQuery: InsertQuery<"users">,
    private readonly updateQuery: UpdateQuery<"users">,
    private readonly deleteQuery: DeleteQuery<"users">,
    private readonly countQuery: CountQuery<"users">,
  ) {}

  public async findMany(params: SelectQueryParams<"users"> = {}, db: Database = this.db) {
    const users = await this.selectQuery.build("users", params, db).execute()
    return userSchema.array().parse(users)
  }

  public async findFirst(params: SelectQueryParams<"users">, db: Database = this.db) {
    const user = await this.selectQuery.build("users", params, db).limit(1).executeTakeFirst()
    return user ? userSchema.parse(user) : null
  }

  public async count(params: SelectQueryParams<"users">, db: Database = this.db) {
    const selectQuery = this.selectQuery.build("users", params, db)
    const count = await this.countQuery.build("users", selectQuery).executeTakeFirstOrThrow()
    return count
  }

  public async create(params: InsertOneQueryParams<"users">, db: Database = this.db) {
    const user = await this.insertQuery.build("users", params, db).executeTakeFirstOrThrow()
    return userSchema.parse(user)
  }

  public async createMany(params: InsertManyQueryParams<"users">, db: Database = this.db) {
    const users = await this.insertQuery.build("users", params, db).execute()
    return userSchema.array().parse(users)
  }

  public async update(params: UpdateQueryParams<"users">, db: Database = this.db) {
    const user = await this.updateQuery.build("users", params, db).executeTakeFirstOrThrow()
    return userSchema.parse(user)
  }

  public async updateMany(params: UpdateQueryParams<"users">, db: Database = this.db) {
    const users = await this.updateQuery.build("users", params, db).execute()
    return userSchema.array().parse(users)
  }

  public async delete(params: DeleteQueryParams<"users">, db: Database = this.db) {
    const user = await this.deleteQuery
      .build("users", params, db)
      .limit(1)
      .executeTakeFirstOrThrow()
    return userSchema.parse(user)
  }

  public async deleteMany(params: DeleteQueryParams<"users"> = {}, db: Database = this.db) {
    const users = await this.deleteQuery.build("users", params, db).execute()
    return userSchema.array().parse(users)
  }
}
