import { AccountType } from "@repo/types/enums"
import { useRouter } from "next/router"
import { toaster } from "@/components/ui/toaster"

export default function useRedirectUserPage() {
  const { push: navigate } = useRouter()

  return (type: AccountType) => {
    switch (type) {
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
