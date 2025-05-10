import { Card, Code, Heading, HStack, Spacer } from "@chakra-ui/react"
import { ExampleTutorForm } from "@/forms/ExampleTutorForm"
import styled from "@emotion/styled"
import { ExampleTutorCards } from "@/components/ExampleTutorCards"

const sourceCodeExample = `\
/* example tutor form */
/* MAKE SURE TO IMPORT OUR FORM!! */
import { Form } from "@/componets/hookform/ZodForm"
const tab3Schema = z.object({
  Id: z.string()
    .min(5, "Must be at least 5 characters in length"),
  Name: z.string()
    .min(5, "Must be at least 5 characters in length"),
  Email: z.string()
    .email("Must be a valid email address"),
  Password: z.string()
    .min(8, "Must be at least 8 characters in length"),
})
  .required()

type Tab3Schema = z.infer<typeof tab3Schema>

export function ExampleTutorForm () {
  const [, writeTutor] = useStore("tutorAccounts")

  const onSubmit = (results: Tab3Schema) => {
    writeTutor({
      id: results.Id,
      name: results.Name,
      email: results.Email,
      password: results.Password,
    })
  }

  return (
    <ZodForm onSubmit={onSubmit} schema={tab3Schema} resetOnSubmit>
      <Fieldset.Root>
        <TextInput name="Id"/>
        <TextInput name="Name"/>
        <TextInput name="Email"/>
        <TextInput name="Password"/>
        <Button type="submit">
          Write tutor with given ID
        </Button>
      </Fieldset.Root>
    </ZodForm>
  )
}
`

const CardRoot = styled(Card.Root)`
    flex: 1 150px;
    min-width: 270px;
`

export default function Tab3 () {
  return (
    <>
      <HStack alignContent="stretch" alignItems="stretch" wrap="wrap">
        <CardRoot>
          <Card.Header>
            <Heading>Write tutors</Heading>
          </Card.Header>
          <Card.Body>
            <ExampleTutorForm/>
          </Card.Body>
        </CardRoot>
        <Code
          display="block"
          whiteSpace="pre"
          style={{ padding: "10px", flexGrow: 1 }}
        >
          {sourceCodeExample}
        </Code>
      </HStack>
      <Spacer style={{ height: 24 }}/>
      <ExampleTutorCards/>
    </>
  )
}

