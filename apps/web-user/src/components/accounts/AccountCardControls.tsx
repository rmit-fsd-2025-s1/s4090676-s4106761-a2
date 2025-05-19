import { Card } from "@chakra-ui/react"
import { FullWidthButton } from "@/components/FullWidthButton"
import Link from "next/link"
import { FullWidthVStack } from "@/components/FullWidthVStack"

export function AccountCardControls({
  backHref,
  loading,
}: {
  backHref?: string
  loading?: boolean
}) {
  return (
    <Card.Footer justifyContent="end" mt="3">
      <FullWidthVStack>
        {backHref && (
          <FullWidthButton asChild variant="subtle">
            <Link href={backHref}>Back</Link>
          </FullWidthButton>
        )}
        <FullWidthButton type="submit" loading={loading}>
          Next
        </FullWidthButton>
      </FullWidthVStack>
    </Card.Footer>
  )
}
