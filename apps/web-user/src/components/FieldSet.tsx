import { ReactNode } from "react"
import { Fieldset } from "@chakra-ui/react"

export function FieldSet ({ children }: { children: ReactNode }) {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        {children}
      </Fieldset.Content>
    </Fieldset.Root>
  )
}
