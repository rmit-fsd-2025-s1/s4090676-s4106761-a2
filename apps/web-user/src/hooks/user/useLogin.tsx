import { AccountType } from "@/context/localstorage/enums"
import { useStore } from "@/hooks/localstorage/useStore"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"

export function useLogin () {
  const navigateUserHome = useRedirectUserPage()
  const [tutors] = useStore("tutorAccounts")
  const [lecturers] = useStore("lecturerAccounts")
  const [, setUser] = useStore("authenticatedUser")

  return ({
    email,
    password,
    type,
  }: {
    email: string,
    password: string,
    type: AccountType
  }): boolean => {
    const foundUser = (
      type === AccountType.TUTOR
      ? tutors
      : lecturers
    ).find((u) =>
      u.email === email && u.password === password,
    )

    if (foundUser) {
      setUser({
        id: foundUser.id,
        type: foundUser.type,
      })
      navigateUserHome(foundUser)
      return true
    } else {
      return false
    }
  }
}

