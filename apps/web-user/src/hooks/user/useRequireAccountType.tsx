import { Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useUser } from "@/hooks/localstorage/useUser"

export function useRequireAccountType(accountType: AccountType) {
  const [, userType] = useUser()
  const { push: navigate } = useRouter()

  const shouldRedirect = userType != accountType

  useEffect(() => {
    if (shouldRedirect) navigate("/login")
  }, [userType, navigate, shouldRedirect])

  return shouldRedirect ? <Text>Redirecting...</Text> : null
}
