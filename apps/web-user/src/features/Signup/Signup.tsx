import { Card } from "@chakra-ui/react"
import { AccountCard } from "@/components/accounts/AccountCard"
import { FieldSet } from "@/components/FieldSet"
import { CardHeader } from "@/components/CardHeader"
import { ZodForm } from "@/components/hookform/ZodForm"
import { z } from "zod"
import { AccountCardControls } from "@/components/accounts/AccountCardControls"
import { TextInput } from "@/components/hookform/TextInput"
import { v4 as uuid } from "uuid"
import { Password } from "@/components/hookform/Password"
import { AccountType } from "@repo/types/enums"
import {
  useSignupTutor,
  signupSchema,
  SignupSchemaType,
} from "@/hooks/user/useSignupTutor"
import { useSignupLecturer } from "@/hooks/user/useSignupLecturer"

const schema = z
  .object({
    Name: z.string().min(1, "Name is required"),
    Email: z.string().email("Valid email is required"),
    Password: z
      .string()
      .min(8, "A password of at least 8 characters is required"),
  })
  .required()

type Schema = z.infer<typeof schema>

export function Signup({ accountType }: { accountType: AccountType }) {
  const signupTutor = useSignupTutor()
  const signupLecturer = useSignupLecturer()

  const handleSubmit = async (formData: SignupSchemaType) => {
    const user = {
      id: uuid(),
      type: accountType,
      email: formData.Email,
      password: formData.Password,
      name: formData.Name,
    }

    try {
      if (accountType === AccountType.LECTURER) {
        await signupLecturer.mutateAsync(formData)
      } else {
        await signupTutor.mutateAsync(formData)
      }
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
          </FieldSet>
        </Card.Body>
        <AccountCardControls backHref="/signup" />
      </ZodForm>
    </AccountCard>
  )
}

// export function Signup({ accountType }: { accountType: AccountType }) {
//   const [, writeTutor] = useStore("tutorAccounts")
//   const [, writeLecturer] = useStore("lecturerAccounts")
//   const login = useLogin()

//   const handleClick = async (formData: Schema) => {
//     const user = {
//       id: uuid(),
//       type: accountType,
//       email: formData.Email,
//       password: formData.Password,
//       name: formData.Name,
//     }
//     if (user.type === AccountType.LECTURER) {
//       writeLecturer(user as LecturerAccount)
//     } else {
//       writeTutor(user as TutorAccount)
//     }
//     await login(user)
//   }
