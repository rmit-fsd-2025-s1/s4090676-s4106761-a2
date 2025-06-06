import { useRouter } from "next/navigation"
import { setUser } from "@/hooks/localstorage/useUser"

export function useLogout() {
  const router = useRouter()

  return () => {
    setUser(null, null)
    router.push("/")
  }
}
