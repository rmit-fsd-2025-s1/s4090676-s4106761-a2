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
import { loginSchema, LoginSchemaType } from "@repo/validation/Login"

const formDefaults = {
  type: AccountType.TUTOR,
}

export function Login() {
  const login = useLogin()

  const handleLogin = async (formData: LoginSchemaType) => {
    login.mutate({
      type: formData.type,
      email: formData.Email,
      password: formData.Password,
    })
  }

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
        <AccountCardControls loading={login.isPending} />
      </ZodForm>
    </AccountCard>
  )
}
