import { AccountType } from "@repo/types/enums"
import { useRouter } from "next/router"
import { toaster } from "@/components/ui/toaster"
import { useUser } from "@/hooks/localstorage/useUser"

export default function useRedirectUserPage() {
  const { push: navigate } = useRouter()
  const [userAccount] = useUser()

  return async (user?: { type: AccountType }) => {
    switch (user?.type || userAccount.data?.account?.type) {
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
