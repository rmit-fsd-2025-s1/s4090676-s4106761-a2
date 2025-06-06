import { UUID } from "@/context/localstorage/types"
import { AccountType } from "@repo/types/enums"

export function useUser(): [UUID, AccountType] {
  const uId =  localStorage.getItem("userId")
  const type =  localStorage.getItem("userType")
  if (!uId || !type) throw new Error("No userId and type found in localStorage")
  return [uId, type as AccountType]
}

export function setUser(userId: UUID, accountType: AccountType): void {
  localStorage.setItem("userId", JSON.stringify(userId))
  localStorage.setItem("userType", JSON.stringify(accountType))
}
