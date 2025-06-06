// pages/tutor/Dashboard.tsx
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { CardHeader } from "@/components/CardHeader"
import { useUser } from "@/hooks/localstorage/useUser"
import { useState } from "react"
import { CourseApplications } from "@/features/TutorApplications/CourseApplications"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { useUserApplications } from "@/hooks/applications/useUserApplications"

export const stackProps = {
  alignItems: "stretch",
  sx: {
    "& > *:not(:last-child)": {
      marginBottom: "1rem",
    },
  },
}

const CURRENT_SEMESTER = Semester.ONE

export function Dashboard() {
  const [{ data: user }, updateUser] = useUser<TutorAccount, true>()

  // TODO: fixme
  const userApplications = useUserApplications(user?.account.id as any)

  // form management
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !user?.skills?.includes(newSkill.trim())) {
      updateUser({ skills: [...(user?.skills ?? []), newSkill.trim()] })
      setNewSkill("")
    }
  }

  return (
    <Box p={4}>
      <Stack direction="column" {...stackProps}>
        {/* Welcome Card */}
        <Card.Root>
          <CardHeader>
            <Heading size="md">Welcome, {user?.account.name}</Heading>
            <Text mt={2}>Tutor Dashboard - Semester {CURRENT_SEMESTER}</Text>
          </CardHeader>
        </Card.Root>

        {/* Application Section */}
        <CourseApplications stackProps={stackProps} />

        {/* Profile Section */}
        <Card.Root>
          <CardHeader>
            <Heading size="md">Your Profile</Heading>
          </CardHeader>
          <Box p={4}>
            <Stack direction="column" {...stackProps}>
              <Box>
                <Heading size="sm">Availability</Heading>
                <Flex gap={4} mt={2}>
                  <Button
                    variant={
                      user?.availability === Availability.PARTTIME
                        ? "solid"
                        : "outline"
                    }
                    onClick={() =>
                      updateUser({ availability: Availability.PARTTIME })
                    }
                  >
                    Part Time
                  </Button>
                  <Button
                    variant={
                      user?.availability === Availability.FULLTIME
                        ? "solid"
                        : "outline"
                    }
                    onClick={() =>
                      updateUser({ availability: Availability.FULLTIME })
                    }
                  >
                    Full Time
                  </Button>
                </Flex>
              </Box>

              <Box>
                <Heading size="sm">Skills</Heading>
                <Flex wrap="wrap" gap={2} mt={2}>
                  {(user?.skills ?? []).map((skill) => (
                    <Tag.Root
                      key={skill}
                      size="md"
                      variant="solid"
                      colorScheme="blue"
                    >
                      {skill}
                    </Tag.Root>
                  ))}
                </Flex>
                <Flex gap={2} mt={2}>
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                  />
                  <Button onClick={addSkill}>Add</Button>
                </Flex>
              </Box>

              <Box>
                <Heading size="sm">Academic Credentials</Heading>
                {/*FIXME: Using only the first value of the array */}
                <Textarea
                  value={
                    (user?.credentials ?? [
                      "List your academic qualifications",
                    ])[0]
                  }
                  onChange={(e) => updateUser({ credentials: e.target.value })}
                  placeholder="List your academic qualifications"
                  mt={2}
                />
              </Box>
            </Stack>
          </Box>
        </Card.Root>

        {/* Previous Roles Section */}
        <Card.Root>
          <CardHeader>
            <Heading size="md">Your Applications</Heading>
          </CardHeader>
          <Box p={4}>
            {userApplications.length === 0 ? (
              <Text>No previous applications</Text>
            ) : (
              <Stack direction="column" {...stackProps}>
                {userApplications.map((role, index) => (
                  <Card.Root key={index}>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="bold">
                            {role.courseName} ({role.courseCode})
                          </Text>
                          <Text>
                            Role:{" "}
                            {role.type === ApplicationType.TUTOR
                              ? "Tutor"
                              : "Lab Assistant"}
                          </Text>
                          <Text>Semester: {role.semester}</Text>
                        </Box>
                        <Badge
                          colorScheme={
                            role.status === ApplicationStatus.ACCEPTED
                              ? "green"
                              : role.status === ApplicationStatus.REJECTED
                                ? "red"
                                : "yellow"
                          }
                        >
                          {role.status}
                        </Badge>
                      </Flex>
                    </CardHeader>
                  </Card.Root>
                ))}
              </Stack>
            )}
          </Box>
        </Card.Root>
      </Stack>
    </Box>
  )
}
