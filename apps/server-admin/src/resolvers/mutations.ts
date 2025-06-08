import { MutationResolvers } from "__generated__/resolvers-types"
import { pubsub } from "../index"

const mutations: MutationResolvers = {
  echo: (_, { string }) => {
    pubsub.publish("ECHO", string)
    return Promise.resolve(string)
  },
}

export default mutations
