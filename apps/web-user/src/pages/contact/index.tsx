import { Button, Heading } from "@chakra-ui/react"

import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Heading size="lg">This is the sameple Contact and info page</Heading>
      <Button asChild>
        <Link href="/">Go to landing page</Link>
      </Button>
    </div>

  )
}
