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
import { toaster } from "@/components/ui/toaster"
import { useUser } from "@/hooks/localstorage/useUser"
import { useEffect } from "react"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"
import { loginSchema, LoginSchemaType } from "@repo/validation/Login"
import { useLoading } from "@/hooks/useLoading"

const formDefaults = {
  type: AccountType.TUTOR,
}

export function Login() {
  const login = useLogin()
  const navigateUserHome = useRedirectUserPage()
  const [user] = useUser()
  const [loading, setLoadingPromise] = useLoading()

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
    if (user) {
      navigateUserHome(user)
    }
  }, [user, navigateUserHome])

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
        <AccountCardControls />
      </ZodForm>
    </AccountCard>
  )
}
