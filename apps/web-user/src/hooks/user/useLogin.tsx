import { AccountType } from "@/context/localstorage/enums"
import { useStore } from "@/hooks/localstorage/useStore"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"
import { useAction } from "@/hooks/api/useApi"
import type { Account } from "@repo/database/entities/account"

type LoginReq = {
  email: string
  password: string
  type: AccountType
}

export function useLogin() {
  const navigateUserHome = useRedirectUserPage()
  const loginAction = useAction<Account>({ path: "/auth/login" })
  const [, setUser] = useStore("authenticatedUser")

  return async (loginDetails: LoginReq) => {
    const accountDetails = await loginAction(loginDetails).catch(
      () => false as const
    )

    if (accountDetails) {
      setUser(accountDetails)
      // navigateUserHome(accountDetails)
    }

    return accountDetails
  }
}
