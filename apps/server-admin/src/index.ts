import { ApolloServer } from "@apollo/server"
import { readFileSync } from "fs"
import express from "express"
import * as http from "node:http"
import apiResolvers from "./resolvers"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from "cors"
import { expressMiddleware } from "@as-integrations/express5"
import cookieParser from "cookie-parser"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/use/ws"
import { PubSub } from "graphql-subscriptions"
import * as console from "node:console"
import cookie from "cookie"

const typeDefs = readFileSync("./Schema.graphql", { encoding: "utf-8" })

export const pubsub = new PubSub<{
  ECHO: string
}>()

export interface DefaultContext {
  dataSources: {}
}

pubsub.subscribe("ECHO", (msg) => {
  console.error("ECHO message sent:", msg)
})

const app = express()
const httpServer = http.createServer(app)

const schema = makeExecutableSchema({ typeDefs, resolvers: apiResolvers })

const server = new ApolloServer<DefaultContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ],
})

await server.start()

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/subscriptions",
})

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      return {
        dataSources: {},
      }
    },
    onConnect: async (ctx) => {
      const cookies = cookie.parse(ctx.extra.request.headers.cookie ?? "")
      console.log(cookies)
    },
  },
  wsServer
)

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
  express.json(),
  cookieParser()
)

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      dataSources: {},
    }),
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:4000/graphql`)
