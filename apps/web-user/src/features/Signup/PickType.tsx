import { Card } from "@chakra-ui/react"
import { AccountTypePicker } from "@/components/accounts/AccountTypePicker"
import { AccountCard } from "@/components/accounts/AccountCard"
import { FieldSet } from "@/components/FieldSet"
import { CardHeader } from "@/components/CardHeader"
import { ZodForm } from "@/components/hookform/ZodForm"
import { z } from "zod"
import { useRouter } from "next/router"
import { AccountCardControls } from "@/components/accounts/AccountCardControls"
import { AccountType } from "@repo/types/enums"

const schema = z
  .object({
    type: z.enum([AccountType.TUTOR, AccountType.LECTURER]),
  })
  .required()

type Schema = z.infer<typeof schema>

const defaultValues = {
  type: AccountType.TUTOR,
}

export function PickType() {
  const router = useRouter()

  const handleClick = (formData: Schema) => {
    if (formData.type === AccountType.TUTOR) {
      router.push("/signup/tutor")
    } else {
      router.push("/signup/lecturer")
    }
  }

  return (
    <AccountCard>
      <CardHeader>Create account</CardHeader>
      <ZodForm onSubmit={handleClick} schema={schema} defaults={defaultValues}>
        <Card.Body>
          <FieldSet>
            <AccountTypePicker />
          </FieldSet>
        </Card.Body>
        <AccountCardControls text="Next" />
      </ZodForm>
    </AccountCard>
  )
}
