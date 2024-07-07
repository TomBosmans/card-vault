import z from "zod"

const configSchema = z
  .object({
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.coerce.number(),
    POSTGRES_PASSWORD: z.string().transform((pw) => (pw.length > 1 ? pw : null)),
    POSTGRES_DATABASE: z.string(),
    POSTGRES_POOL_MAX: z.coerce.number(),
  })
  .transform((env) => ({
    postgres: {
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DATABASE,
      pool: {
        max: env.POSTGRES_POOL_MAX,
      },
      url: env.POSTGRES_PASSWORD
        ? `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DATABASE}`
        : `postgres://${env.POSTGRES_USER}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DATABASE}`,
    },
  }))

export default configSchema
