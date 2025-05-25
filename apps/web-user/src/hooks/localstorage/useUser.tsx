/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/hooks/localstorage/useStore"
import { UUID } from "@/context/localstorage/types"
import { AccountDetails } from "@repo/database/types/AccountDetails"
import { useAction } from "@/hooks/api/useApi"
import { useQuery, useQueryClient } from "@tanstack/react-query"

/**
 * Get information on the currently authenticated user
 * Or update some part of the record
 * Or pass an id and type to look up a user
 */
export function useUser<T extends AccountDetails, SignedIn = false>(
  userId?: UUID
): [
  typeof query,
  SignedIn extends true ? typeof updateUser : typeof updateUser | false,
] {
  const [loggedInUserId] = useStore("userId")
  const queryClient = useQueryClient()

  const targetId = loggedInUserId || userId

  const query = useQuery<T>({
    enabled: !!targetId,
    queryKey: ["/user", targetId],
  })

  const updateUser: (body: Partial<AccountDetails>) => Promise<AccountDetails> =
    useAction<AccountDetails>({
      path: `/user/${userId}`,
      options: { method: "PUT" },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user", targetId] })
      },
    })

  return [query, !!targetId && (updateUser as any)]
}
