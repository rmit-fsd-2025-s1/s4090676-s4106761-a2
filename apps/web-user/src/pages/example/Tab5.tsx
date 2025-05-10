import { Card, Code, Heading, HStack, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"

const sourceCodeExample = `\
export function UserAvailabilityToggle() {
  const [user, updateUser] = useUser("UUID-EXAMPLE-LIAM")
  
  const onClick () => {
    updateUser({ availability: user.availability === Availability.FULLTIME ? Availability.PARTTIME : Availability.FULLTIME })
  }
  
  return (
    <>
      <Heading>User availability: {user.availability}</Heading>
      <Button onClick={onClick}>
        Click to swap user availability
      </Button>
    </>
  )
}
`

const CardRoot = styled(Card.Root)`
    flex: 1 150px;
    min-width: 270px;
`

const CardBody = styled(Card.Body)`
    & > * {
        margin-bottom: 1rem;
    }
`

export default function Tab5 () {
  return (
    <>
      <HStack alignContent="stretch" alignItems="stretch" wrap="wrap">
        <CardRoot>
          <Card.Header>
            <Heading>Updating individual records</Heading>
          </Card.Header>
          <CardBody>
            <Text><Code>const [application, updateApplication] = useApplication(id)</Code></Text>
            <Text><Code>const [user, updateUser] = useUser(id)</Code></Text>
            <Text><Code>const course = useCourse(id)</Code></Text>
            <Text>
              Please use any <Code>updateXXX</Code> hook to write or overwrite the object in localstorage.
              Read more about why in <Code>src/context/localstorage/README.md</Code>
            </Text>
            <Text>An example:</Text>
            <Code
              display="block"
              whiteSpace="pre"
              style={{ padding: "10px", flexGrow: 1 }}
            >{sourceCodeExample}</Code>
          </CardBody>
        </CardRoot>
      </HStack>
    </>
  )
}

