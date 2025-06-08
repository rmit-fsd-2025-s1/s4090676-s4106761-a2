import styled from "@emotion/styled"
import { ButtonGroup, HStack } from "@chakra-ui/react"
import { BooksIcon } from "@/icons/Books"
import Link from "next/link"

const Header = styled.header`
  background-color: indigo;
  color: white;
  padding: 0.7rem 1rem;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 99;
`

const HStackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ButtonGroupEnd = styled(ButtonGroup)`
  margin-left: auto;
`

export function AppHeader() {
  return (
    <Header>
      <HStack>
        <HStackLink href="/apps/web-admin/public">
          <BooksIcon />
          <h1>{process.env.NEXT_PUBLIC_PRODUCT_NAME}</h1>
        </HStackLink>
      </HStack>
    </Header>
  )
}
