import { SubscriptionResolvers } from "__generated__/resolvers-types"
import { pubsub } from "../index"

const queries: SubscriptionResolvers = {
  resolve: {
    echo: {
      subscribe: () => pubsub.asyncIterableIterator(["ECHO"]),
    },
  },
}

export default queries
