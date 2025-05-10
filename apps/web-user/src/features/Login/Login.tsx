import { Card } from "@chakra-ui/react"
import { AccountTypePicker } from "@/components/accounts/AccountTypePicker"
import { Password } from "@/components/hookform/Password"
import { AccountCard } from "@/components/accounts/AccountCard"
import { FieldSet } from "@/components/FieldSet"
import { CardHeader } from "@/components/CardHeader"
import { ZodForm } from "@/components/hookform/ZodForm"
import { z } from "zod"
import { AccountType } from "@/context/localstorage/enums"
import { TextInput } from "@/components/hookform/TextInput"
import { AccountCardControls } from "@/components/accounts/AccountCardControls"
import { useLogin } from "@/hooks/user/useLogin"
import { toaster } from "@/components/ui/toaster"
import { useUser } from "@/hooks/localstorage/useUser"
import { useEffect } from "react"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"

const schema = z
  .object({
    type: z.enum([AccountType.TUTOR, AccountType.LECTURER]),
    Email: z.string().email("Please enter a valid email"),
    Password: z
      .string()
      .min(8, "Please enter a password of at least 8 characters"),
  })
  .required()

type Schema = z.infer<typeof schema>

const formDefaults = {
  type: AccountType.TUTOR,
}

export function Login() {
  const login = useLogin()
  const navigateUserHome = useRedirectUserPage()
  const [user] = useUser()

  const handleLogin = (formData: Schema) => {
    const result = login({
      type: formData.type,
      email: formData.Email,
      password: formData.Password,
    })

    if (!result) {
      toaster.create({
        description: "No user found! Please try again",
        type: "error",
      })
    }
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
      <ZodForm onSubmit={handleLogin} schema={schema} defaults={formDefaults}>
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
