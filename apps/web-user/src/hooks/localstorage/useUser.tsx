import { AccountType } from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"
import { useRouter } from "next/router"

export function useUser(): [UUID, AccountType] {
  const router = useRouter()
  const uId = JSON.parse(localStorage.getItem("userId") as string)
  const type = JSON.parse(localStorage.getItem("userType") as string)
  if (!uId || !type) router.push("/login")
  return [uId, type as AccountType]
}

export function useIsLoggedIn() {
  if (typeof window === "undefined") return false

  const uId = localStorage.getItem("userId")
  const type = localStorage.getItem("userType")
  return uId && type && JSON.parse(uId) && JSON.parse(type)
}

export function setUser(
  userId: UUID | null,
  accountType: AccountType | null
): void {
  localStorage.setItem("userId", JSON.stringify(userId))
  localStorage.setItem("userType", JSON.stringify(accountType))
}
