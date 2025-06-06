import { Card, Flex, For, HStack } from "@chakra-ui/react"

export function ExampleTutorCards({ lecturers }: { lecturers?: boolean }) {
  /**
   * We fetch data from local storage with useStore
   */
  const [tutorAccounts] = useStore("tutorAccounts")
  const [lecturerAccounts] = useStore("lecturerAccounts")

  return (
    <Flex wrap="wrap" gap={3}>
      {/* Here we look at every tutor account from local storage, and show off their name*/}
      <For<LecturerAccount | TutorAccount>
        each={lecturers ? lecturerAccounts : tutorAccounts}
      >
        {(account: TutorAccount | LecturerAccount) => (
          <Card.Root key={account.id}>
            <Card.Header>{account.name}</Card.Header>
            <Card.Body>
              <HStack>
                <p>
                  <b>Password</b>
                </p>
                <p>{account.password}</p>
              </HStack>
              <HStack>
                <p>
                  <b>Email</b>
                </p>
                <p>{account.email}</p>
              </HStack>
            </Card.Body>
          </Card.Root>
        )}
      </For>
    </Flex>
  )
}
