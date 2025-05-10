import { Code, Heading } from "@chakra-ui/react"
import { ExampleTutorCards } from "@/components/ExampleTutorCards"

export default function Tab1 () {
  return (
    <>
      <p>The data fetching looks like this!</p>
      <Code style={{ color: "red" }}>
        {"const [tutorAccounts] = useStore(\"tutorAccounts\")"}
      </Code>
      <Heading style={{ padding: "10px" }}>Tutors</Heading>
      <ExampleTutorCards/>
      <Heading style={{ padding: "10px" }}>Lecturers</Heading>
      <ExampleTutorCards lecturers/>
    </>
  )
}

