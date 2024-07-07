import serverFactory from "./server.factory"

export default async function serverTestFactory() {
  const server = await serverFactory({ enableLogger: false, enableSwagger: false })
  return server
}
