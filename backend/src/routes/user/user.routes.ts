import userSchema from "src/schemas/user.schema"
import type Server from "src/server/server.type"

export default function userRoutes(server: Server) {
  server.route({
    url: "/users",
    method: "GET",
    schema: {
      response: {
        200: userSchema.array(),
      },
    },
    handler: async (req) => {
      const userRepository = req.diScope.resolve("userRepository")
      return await userRepository.findMany()
    },
  })
}
