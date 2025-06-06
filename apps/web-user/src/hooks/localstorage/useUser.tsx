import { AccountType } from "@repo/types/enums"

export function useUser(): [UUID, AccountType] {
  const uId = JSON.parse(localStorage.getItem("userId") as string)
  const type = JSON.parse(localStorage.getItem("userType") as string)
  if (!uId || !type) throw new Error("No userId and type found in localStorage")
  return [uId, type as AccountType]
}

export function useIsLoggedIn() {
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
