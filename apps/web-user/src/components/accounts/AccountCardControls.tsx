import { Card } from "@chakra-ui/react"
import { FullWidthButton } from "@/components/FullWidthButton"
import Link from "next/link"
import { FullWidthVStack } from "@/components/FullWidthVStack"

export function AccountCardControls({
  backHref,
  loading,
  text = "Create Account",
}: {
  backHref?: string
  loading?: boolean
  text?: string
}) {
  return (
    <Card.Footer justifyContent="end" mt="3">
      <FullWidthVStack>
        <FullWidthButton type="submit" loading={loading}>
          {text}
        </FullWidthButton>
        {backHref && (
          <FullWidthButton asChild variant="subtle">
            <Link href={backHref}>Back</Link>
          </FullWidthButton>
        )}
      </FullWidthVStack>
    </Card.Footer>
  )
}
