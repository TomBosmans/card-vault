import serverFactory from "src/server/server.factory"

export default async function testServerFactory() {
  const server = await serverFactory({
    enableLogger: false,
    enableSwagger: false,
  })
  return server
}
