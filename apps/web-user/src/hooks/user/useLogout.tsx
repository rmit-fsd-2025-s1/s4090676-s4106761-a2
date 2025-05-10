import { useStore } from "@/hooks/localstorage/useStore"
import { useRouter } from "next/navigation"

export function useLogout() {
  const [, writeUser] = useStore("authenticatedUser")
  const router = useRouter()

  return (options?: { doNotMovePage?: boolean }) => {
    writeUser(null)
    if (!options?.doNotMovePage) router.push("/")
  }
}
