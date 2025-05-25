import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react"
import { CardHeader } from "@/components/CardHeader"
import { stackProps } from "@/features/TutorHome/Dashboard"
import { useStore } from "@/hooks/localstorage/useStore"
import {
  ApplicationStatus,
  ApplicationType,
} from "@/context/localstorage/enums"
import { v4 as uuid } from "uuid"
import { UUID } from "@/context/localstorage/types"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { useUser } from "@/hooks/localstorage/useUser"

export function CourseApplications(props: {
  stackProps: {
    alignItems: string
    sx: { "& > *:not(:last-child)": { marginBottom: string } }
  }
}) {
  const [courses] = useStore("courses")
  const [applications, putApplication] = useStore("applications")
  const [{ data: user }] = useUser<TutorAccount, true>()

  const submitApplication = (type: ApplicationType, courseId: UUID) => {
    console.log("im calling yeah")
    putApplication({
      id: uuid(),
      type,
      courseId,
      status: ApplicationStatus.PENDING,
      tutorId: user!.id,
    })
  }

  return (
    <Card.Root>
      <CardHeader>
        <Heading size="md">Apply for Roles</Heading>
      </CardHeader>
      <Box p={4}>
        <Stack direction="column" {...props.stackProps}>
          <Heading size="sm">Available Courses</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            {courses.map((course) => {
              const haveApplied = applications.find(
                (application) =>
                  application.courseId === course.id &&
                  application.tutorId === user?.id
              )
              return (
                <Card.Root key={course.id}>
                  <CardHeader>
                    <Stack direction="column" {...stackProps}>
                      <Heading size="sm">{course.code}</Heading>
                      <Text>{course.name}</Text>
                      <Flex gap={2} wrap="wrap">
                        <Show
                          when={!haveApplied}
                          fallback={<Text>Application complete!</Text>}
                        >
                          {course.availableRoles.includes(
                            ApplicationType.TUTOR
                          ) && (
                            <Button
                              size="sm"
                              as="a"
                              onClick={() =>
                                submitApplication(
                                  ApplicationType.TUTOR,
                                  course.id
                                )
                              }
                            >
                              Apply as Tutor
                            </Button>
                          )}
                          {course.availableRoles.includes(
                            ApplicationType.LAB
                          ) && (
                            <Button
                              size="sm"
                              as="a"
                              colorScheme="teal"
                              onClick={() =>
                                submitApplication(
                                  ApplicationType.LAB,
                                  course.id
                                )
                              }
                            >
                              Apply as Lab Assistant
                            </Button>
                          )}
                        </Show>
                      </Flex>
                    </Stack>
                  </CardHeader>
                </Card.Root>
              )
            })}
          </Grid>
        </Stack>
      </Box>
    </Card.Root>
  )
}
