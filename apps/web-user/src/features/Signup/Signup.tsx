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
import { useLogin } from "@/hooks/user/useLogin"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { Course } from "@repo/database/entities/course"
import { Account } from "@repo/database/entities/account"
import { useMutation } from "@tanstack/react-query"
import { createMutation } from "@/hooks/api/useApi"
import { LecturerAccount } from "@repo/database/entities/lecturerAccount"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { AccountType } from "@repo/types/enums"
import {
  useSignupTutor,
  signupSchema,
  SignupSchemaType,
} from "@/hooks/user/useSignupTutor"
import { useSignupLecturer } from "@/hooks/user/useSignupLecturer"

export function allCourses() {
  const {
    query: { courseId },
    isReady,
    pathname,
  } = useRouter()
  const { data: course, isSuccess } = useQuery<Course>({
    queryKey: ["/course", courseId],
  })

  if (!isReady && !isSuccess) return null
}

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
  const { data: accountTypeEnum, isSuccess } = useQuery<Account>({
    queryKey: ["/accountType", accountType],
  })

  const signupTutor = useSignupTutor()
  const signupLecturer = useSignupLecturer()

  const handleSubmit = async (formData: SignupSchemaType) => {
    const user = {
      id: uuid(),
      type: accountTypeEnum,
      email: formData.Email,
      password: formData.Password,
      name: formData.Name,
    }

    try {
      if (accountTypeEnum?.type === AccountType.LECTURER) {
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
