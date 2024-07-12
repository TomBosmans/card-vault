import UserRepository from "./user.repository"

const repositories = {
  userRepository: UserRepository,
} as const

export default repositories
