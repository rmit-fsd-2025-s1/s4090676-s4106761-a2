import styled from "@emotion/styled"
import { Button, ButtonGroup, HStack, Show } from "@chakra-ui/react"
import { BooksIcon } from "@/icons/Books"
import Link from "next/link"
import { SignInIcon } from "@/icons/SignIn"
import { PlusIcon } from "@/icons/Plus"
import { useIsLoggedIn, useUser } from "@/hooks/localstorage/useUser"
import { useLogout } from "@/hooks/user/useLogout"
import { SignOutIcon } from "@/icons/SignOut"
import { HomeIcon } from "@/icons/Home"
import useRedirectUserPage from "@/hooks/user/useRedirectUserPage"

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

function UnauthenticatedButtons() {
  return (
    <>
      <Button asChild>
        <Link href="/signup">
          Sign up
          <PlusIcon />
        </Link>
      </Button>
      <Button asChild>
        <Link href="/login">
          Sign in
          <SignInIcon />
        </Link>
      </Button>
    </>
  )
}

function AuthenticatedButtons() {
  const logout = useLogout()
  const redirect = useRedirectUserPage()
  const [id, type] = useUser()

  return (
    <>
      <Button onClick={() => redirect(type)}>
        Home
        <HomeIcon />
      </Button>
      <Button onClick={logout}>
        Log out
        <SignOutIcon />
      </Button>
    </>
  )
}

export function AppHeader() {
  const loggedIn = useIsLoggedIn()

  return (
    <Header>
      <HStack>
        <HStackLink href="/">
          <BooksIcon />
          <h1>{process.env.NEXT_PUBLIC_PRODUCT_NAME}</h1>
        </HStackLink>

        <ButtonGroupEnd>
          <Show when={loggedIn} fallback={<UnauthenticatedButtons />}>
            <AuthenticatedButtons />
          </Show>
        </ButtonGroupEnd>
      </HStack>
    </Header>
  )
}
