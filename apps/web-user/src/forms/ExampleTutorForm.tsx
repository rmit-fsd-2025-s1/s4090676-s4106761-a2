import { ZodForm } from "@/components/hookform/ZodForm"
import { Button, Fieldset } from "@chakra-ui/react"
import { TextInput } from "@/components/hookform/TextInput"
import { z } from "zod"
import { useStore } from "@/hooks/localstorage/useStore"
import { AccountType } from "@/context/localstorage/enums"

const tab3Schema = z
  .object({
    Id: z.string().min(5, "Must be at least 5 characters in length"),
    Name: z.string().min(5, "Must be at least 5 characters in length"),
    Email: z.string().email("Must be a valid email address"),
    Password: z.string().min(8, "Must be at least 8 characters in length"),
  })
  .required()

type Tab3Schema = z.infer<typeof tab3Schema>

export function ExampleTutorForm() {
  const [, writeTutor] = useStore("tutorAccounts")

  const onSubmit = (results: Tab3Schema) => {
    writeTutor({
      id: results.Id,
      type: AccountType.TUTOR,
      name: results.Name,
      email: results.Email,
      password: results.Password,
    })
  }

  return (
    <ZodForm onSubmit={onSubmit} schema={tab3Schema} resetOnSubmit>
      <Fieldset.Root>
        <TextInput name="Id" />
        <TextInput name="Name" />
        <TextInput name="Email" />
        <TextInput name="Password" />
        <Button type="submit">Write tutor with given ID</Button>
      </Fieldset.Root>
    </ZodForm>
  )
}
