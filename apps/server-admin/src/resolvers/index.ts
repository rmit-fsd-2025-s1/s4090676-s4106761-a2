import { Resolvers } from "../__generated__/resolvers-types"
import Query from "./queries"
import Mutation from "./mutations"
import Subscription from "./subscriptions"

// Note this "Resolvers" type isn't strictly necessary because we are already
// separately type checking our queries and resolvers. However, the "Resolvers"
// generated types is useful syntax if you are defining your resolvers
// in a single file.
const apiResolvers: Resolvers = { Query, Mutation, Subscription }

export default apiResolvers
