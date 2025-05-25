import { AccountType } from "@repo/types/enums"
import { useRouter } from "next/router"
import { useUser } from "@/hooks/localstorage/useUser"
import { toaster } from "@/components/ui/toaster"
import type { AccountDetails } from "@repo/database/types/Account"

export default function useRedirectUserPage() {
  const { push: navigate } = useRouter()
  const [userAccount] = useUser()

  return (user?: { type: AccountType }) => {
    switch (user?.type || userAccount?.type) {
      case AccountType.TUTOR:
        navigate("/tutor")
        break
      case AccountType.LECTURER:
        navigate("/lecturer")
        break
      default:
        toaster.create({
          description: "Account type is not defined. Please login again",
          type: "error",
        })
    }
  }
}
