import { QueryResolvers } from "__generated__/resolvers-types"

const queries: QueryResolvers = {
  echo: async (_, { string }) => {
    return Promise.resolve(string)
  },
}

export default queries
