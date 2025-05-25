import { Card } from "@chakra-ui/react"
import { AccountTypePicker } from "@/components/accounts/AccountTypePicker"
import { Password } from "@/components/hookform/Password"
import { AccountCard } from "@/components/accounts/AccountCard"
import { FieldSet } from "@/components/FieldSet"
import { CardHeader } from "@/components/CardHeader"
import { ZodForm } from "@/components/hookform/ZodForm"
import { AccountType } from "@/context/localstorage/enums"
import { TextInput } from "@/components/hookform/TextInput"
import { AccountCardControls } from "@/components/accounts/AccountCardControls"
import { useLogin } from "@/hooks/user/useLogin"
import { useEffect } from "react"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"
import { loginSchema, LoginSchemaType } from "@repo/validation/Login"
import { useLoading } from "@/hooks/useLoading"
import { useStore } from "@/hooks/localstorage/useStore"
import { useUser } from "@/hooks/localstorage/useUser"

const formDefaults = {
  type: AccountType.TUTOR,
}

export function Login() {
  const login = useLogin()
  const navigateUserHome = useRedirectUserPage()
  const [loggedInUserId] = useStore("userId")
  const [loading, setLoadingPromise] = useLoading()
  const [query] = useUser("24d65f24-9813-4665-aa18-ffabc0e011db")

  console.log(query.data)

  const handleLogin = async (formData: LoginSchemaType) => {
    const loginPromise = login({
      type: formData.type,
      email: formData.Email,
      password: formData.Password,
    })
    setLoadingPromise(loginPromise)
  }

  /**
   * If there is already an authenticated user set, and they come to the login page,
   * redirect them to their home page
   */
  useEffect(() => {
    if (loggedInUserId) {
      navigateUserHome()
    }
  }, [loggedInUserId, navigateUserHome])

  return (
    <AccountCard>
      <CardHeader>Sign in to {process.env.NEXT_PUBLIC_PRODUCT_NAME}</CardHeader>
      <ZodForm
        onSubmit={handleLogin}
        schema={loginSchema}
        defaults={formDefaults}
      >
        <Card.Body>
          <FieldSet>
            <AccountTypePicker />
            <TextInput name="Email" />
            <Password name="Password" />
          </FieldSet>
        </Card.Body>
        <AccountCardControls loading={loading} />
      </ZodForm>
    </AccountCard>
  )
}
