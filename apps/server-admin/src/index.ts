import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs"
import { BooksDataSource } from "./datasources/BooksAPI"

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
]

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
}

const typeDefs = readFileSync("./Schema.graphql", { encoding: "utf-8" })

export interface DefaultContext {
  dataSources: {
    booksAPI: BooksDataSource
  }
}

const server = new ApolloServer<DefaultContext>({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      dataSources: {
        booksAPI: new BooksDataSource(),
      },
    }
  },
})

console.log(`🚀  Server ready at: ${url}`)
