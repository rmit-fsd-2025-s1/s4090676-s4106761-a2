import { ApolloServer } from "@apollo/server"
import { readFileSync } from "fs"
import { BooksDataSource } from "./datasources/BooksAPI"
import express from "express"
import * as http from "node:http"
import apiResolvers from "./resolvers"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from "cors"
import { expressMiddleware } from "@as-integrations/express5"

const typeDefs = readFileSync("./Schema.graphql", { encoding: "utf-8" })

export interface DefaultContext {
  dataSources: {
    booksAPI: BooksDataSource
  }
}

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer<DefaultContext>({
  typeDefs,
  resolvers: apiResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      dataSources: {
        booksAPI: new BooksDataSource(),
      },
    }),
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:4000/graphql`)
