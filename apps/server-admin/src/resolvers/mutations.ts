import { MutationResolvers } from "__generated__/resolvers-types"

const mutations: MutationResolvers = {
  addBook: async (_, { title, author }, { dataSources }) => {
    return dataSources.booksAPI.addBook({ title, author })
  },
}

export default mutations
