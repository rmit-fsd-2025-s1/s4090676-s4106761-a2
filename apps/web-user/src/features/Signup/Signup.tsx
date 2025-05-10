import { Card } from "@chakra-ui/react"
import { AccountCard } from "@/components/accounts/AccountCard"
import { FieldSet } from "@/components/FieldSet"
import { CardHeader } from "@/components/CardHeader"
import { ZodForm } from "@/components/hookform/ZodForm"
import { z } from "zod"
import { AccountType } from "@/context/localstorage/enums"
import { AccountCardControls } from "@/components/accounts/AccountCardControls"
import { useStore } from "@/hooks/localstorage/useStore"
import { TextInput } from "@/components/hookform/TextInput"
import { v4 as uuid } from "uuid"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"
import { LecturerAccount, TutorAccount } from "@/context/localstorage/types"
import { Password } from "@/components/hookform/Password"
import { useLogin } from "@/hooks/user/useLogin"

const schema = z.object({
  Name: z.string()
    .min(1, "Name is required"),
  Email: z.string()
    .email("Valid email is required"),
  Password: z.string()
    .min(8, "A password of at least 8 characters is required"),
})
  .required()

type Schema = z.infer<typeof schema>

export function Signup ({ accountType }: { accountType: AccountType }) {
  const redirect = useRedirectUserPage()

  const [, writeTutor] = useStore("tutorAccounts")
  const [, writeLecturer] = useStore("lecturerAccounts")
  const login = useLogin()

  const handleClick = (formData: Schema) => {
    const user = {
      id: uuid(),
      type: accountType,
      email: formData.Email,
      password: formData.Password,
      name: formData.Name,
    }
    if (user.type === AccountType.LECTURER) {
      writeLecturer(user as LecturerAccount)
    } else {
      writeTutor(user as TutorAccount)
    }
    login(user)
    redirect(user)
  }

  return (
    <AccountCard>
      <CardHeader>
        Create {accountType === AccountType.LECTURER ? "lecturer" : "tutor"} account
      </CardHeader>
      <ZodForm onSubmit={handleClick} schema={schema}>
        <Card.Body>
          <FieldSet>
            <TextInput name="Name"/>
            <TextInput name="Email"/>
            <Password name="Password"/>
          </FieldSet>
        </Card.Body>
        <AccountCardControls backHref="/signup"/>
      </ZodForm>
    </AccountCard>
  )
}
