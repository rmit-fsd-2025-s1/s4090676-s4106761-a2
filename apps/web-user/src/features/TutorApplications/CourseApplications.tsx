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
import { v4 as uuid } from "uuid"
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { Course } from "@repo/database/entities/course"
import { Application } from "@repo/database/entities/application"
import { createMutation } from "@/hooks/api/useApi"
import { ApplicationStatus, ApplicationType } from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"
import { ApplicationReq } from "@repo/types-api/userApi"

export function CourseApplications(props: {
  stackProps: {
    alignItems: string
    sx: { "& > *:not(:last-child)": { marginBottom: string } }
  }
}) {
  const { data: user } = useSuspenseQuery<TutorAccount>({
    queryKey: ["/user"],
  })
  const { data: courses } = useSuspenseQuery<Course[]>({
    queryKey: ["/course", "all"],
  })
  const { data: applications } = useSuspenseQuery<Application[]>({
    queryKey: ["/user", "applications"],
  })

  const queryClient = useQueryClient()
  const putApplication = useMutation({
    ...createMutation<ApplicationReq, Application>({
      path: "/application/new",
    }),
    onSuccess: () => {
      // Invalidate the applications query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/user", "applications"] })
    },
  })

  const submitApplication = (type: ApplicationType, courseId: UUID) => {
    putApplication.mutate({
      type,
      course: courseId,
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
                  application.course.id === course.id &&
                  application.tutor.id === user?.id
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
