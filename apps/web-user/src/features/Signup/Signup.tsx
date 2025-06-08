import { Card } from "@chakra-ui/react"
import { AccountCard } from "@/components/accounts/AccountCard"
import { FieldSet } from "@/components/FieldSet"
import { CardHeader } from "@/components/CardHeader"
import { ZodForm } from "@/components/hookform/ZodForm"
import { AccountCardControls } from "@/components/accounts/AccountCardControls"
import { TextInput } from "@/components/hookform/TextInput"
import { Password } from "@/components/hookform/Password"
import { AccountType } from "@repo/types/enums"
import {
  useSignupTutor,
  signupSchema,
  SignupSchemaType,
} from "@/hooks/user/useSignupTutor"
import { useSignupLecturer } from "@/hooks/user/useSignupLecturer"
import { useRouter } from "next/router"

export function Signup({ accountType }: { accountType: AccountType }) {
  const signupTutor = useSignupTutor()
  const signupLecturer = useSignupLecturer()
  const router = useRouter()

  const handleSubmit = async (formData: SignupSchemaType) => {
    try {
      if (accountType === AccountType.LECTURER) {
        await signupLecturer.mutateAsync(formData)
      } else {
        await signupTutor.mutateAsync(formData)
      }
      router.push("/login")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AccountCard>
      <CardHeader>
        Create {accountType === AccountType.LECTURER ? "lecturer" : "tutor"}{" "}
        account
      </CardHeader>
      <ZodForm onSubmit={handleSubmit} schema={signupSchema}>
        <Card.Body>
          <FieldSet>
            <TextInput name="Name" />
            <TextInput name="Email" />
            <Password name="Password" />
            <Password name="confirmPassword" label="Confirm Password" />
          </FieldSet>
        </Card.Body>
        <AccountCardControls
          backHref="/signup"
          text="Create account"
          loading={signupLecturer.isPending || signupTutor.isPending}
        />
      </ZodForm>
    </AccountCard>
  )
}
