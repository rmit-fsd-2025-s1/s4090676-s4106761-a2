import { AccountType } from "@/context/localstorage/enums"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"
import { createMutation } from "@/hooks/api/useApi"
import type { AccountDetails } from "@repo/database/types/AccountDetails"
import { useMutation } from "@tanstack/react-query"
import { setUser } from "@/hooks/localstorage/useUser"

type LoginReq = {
  email: string
  password: string
  type: AccountType
}

export function useLogin() {
  const navigateUserHome = useRedirectUserPage()

  return useMutation({
    ...createMutation<LoginReq, AccountDetails>({
      path: "/auth/login"
    }),
    onSuccess: (data) => {
      setUser(data.id, data.account.type)
      navigateUserHome(data.account.type)
    },
  })
}
