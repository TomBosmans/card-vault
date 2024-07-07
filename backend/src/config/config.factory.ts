import configSchema from "./config.schema"

export type Config = ReturnType<typeof configFactory>

export default function configFactory() {
  const config = configSchema.parse(process.env)
  return config
}
