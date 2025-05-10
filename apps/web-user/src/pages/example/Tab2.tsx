import {
  Button,
  ButtonGroup,
  Card,
  Code,
  HStack,
  Spacer,
} from "@chakra-ui/react"
import { useStore } from "@/hooks/localstorage/useStore"
import { AccountType } from "@/context/localstorage/enums"
import { useLogout } from "@/hooks/user/useLogout"

const sourceCodeExample = `\
import { useStore } from "@/hooks/localstorage/useStore"

export function ButtonExample () {
  const [user, writeUser] = useStore("authenticatedUser")
  const logout = useLogout()

  return <>
    <p>
      username:
      { user
        ? user.username
        : 'Not signed in'
      }
    </p>
    <Button
      onClick={() => writeUser({
        id: "test-id",
        type: AccountType.TUTOR,
      })}
    >
      Write test data to authenticatedUser
    </Button>
    <Button onClick={logout}>
      Sign out
    </Button>
  </>
}
`

export default function Tab2() {
  const [user, writeUser] = useStore("authenticatedUser")
  const logout = useLogout()

  return (
    <>
      <Code display="block" whiteSpace="pre" style={{ padding: "10px" }}>
        {sourceCodeExample}
      </Code>
      <Spacer style={{ height: 24 }} />
      <Card.Root>
        <Card.Header>Authenticated user</Card.Header>
        <Card.Body>
          <HStack>
            <p>
              <b>ID</b>
            </p>
            <p>{user?.id ?? "Signed out"}</p>
          </HStack>
          <HStack>
            <p>
              <b>Type</b>
            </p>
            <p>{user?.type ?? "Signed out"}</p>
          </HStack>
        </Card.Body>
      </Card.Root>
      <Spacer style={{ height: 24 }} />
      <ButtonGroup>
        <Button
          onClick={() =>
            writeUser({
              id: "test-id",
              type: AccountType.TUTOR,
            })
          }
        >
          Write test data to authenticatedUser
        </Button>
        <Button onClick={() => logout({ doNotMovePage: true })}>
          Sign out
        </Button>
      </ButtonGroup>
    </>
  )
}
