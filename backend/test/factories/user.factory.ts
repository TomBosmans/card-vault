import { faker } from "@faker-js/faker"
import type UserRepository from "src/repositories/user.repository"
import BaseFactory from "./base.factory"

type BuildAttr = Parameters<UserRepository["create"]>[0]
type CreateAttr = Awaited<ReturnType<UserRepository["create"]>>

export default class UserFactory extends BaseFactory<BuildAttr, CreateAttr> {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  protected async save(attr: BuildAttr): Promise<CreateAttr> {
    const user = await this.userRepository.findFirst({ where: { id: attr.id } })
    return user ? user : await this.userRepository.create(attr)
  }

  protected generate(): BuildAttr {
    const attr: BuildAttr = {
      id: faker.string.uuid(),
      get email() {
        return faker.internet.email({ firstName: this.firstName, lastName: this.lastName })
      },
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      passwordHash: faker.internet.password(),
      createdAt: faker.date.past(),
      get updatedAt() {
        return this.createdAt
      },
    }

    return attr
  }
}
