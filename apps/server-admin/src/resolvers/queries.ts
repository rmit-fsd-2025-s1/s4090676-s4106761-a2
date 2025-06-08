import { QueryResolvers } from "__generated__/resolvers-types"

const queries: QueryResolvers = {
  books: async (_, __, { dataSources }) => {
    return dataSources.booksAPI.getBooks()
  },
}

export default queries
