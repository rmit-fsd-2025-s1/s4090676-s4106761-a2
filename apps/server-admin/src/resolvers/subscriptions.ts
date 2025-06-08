import { SubscriptionResolvers } from "__generated__/resolvers-types"

const subscriptions: SubscriptionResolvers = {
  echoSubscription: {
    subscribe: async function* () {
      for await (const word of ["Hello", "Bonjour", "Ciao"]) {
        yield word
      }
    },
    resolve: () => "why",
  },
}

export default subscriptions
