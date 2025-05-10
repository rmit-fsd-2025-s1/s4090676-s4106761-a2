import { useStore } from "@/hooks/localstorage/useStore"
import { AccountType } from "@/context/localstorage/enums"
import { Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useRouter } from "next/router"

export function useRequireAccountType(accountType: AccountType) {
  const [user] = useStore("authenticatedUser")
  const { push: navigate } = useRouter()

  const shouldRedirect = user?.type != accountType

  useEffect(() => {
    if (shouldRedirect) navigate("/login")
  }, [user, navigate, shouldRedirect])

  return shouldRedirect ? <Text>Redirecting...</Text> : null
}
