import { Button, Card, Table } from "@chakra-ui/react"
import Link from "next/link"
import styled from "@emotion/styled"
import { RightArrowIcon } from "@/icons/RightArrow"
import { Course } from "@repo/database/entities/course"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CoursesRes } from "@repo/types-api/userApi"

const SmallButton = styled(Button)`
  height: unset;
  padding: 4px;
  margin: 0;
`

const Row = styled(Table.Row)`
  background-color: inherit;
`

function TableRow({ course }: { course: CoursesRes[0] }) {
  return (
    <Row key={course.id}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.name}</Table.Cell>
      <Table.Cell>{course.frequency}</Table.Cell>
      <Table.Cell textAlign="end">
        <SmallButton asChild>
          <Link href={`/lecturer/courses/${course.id}`}>
            See applicants
            <RightArrowIcon />
          </Link>
        </SmallButton>
      </Table.Cell>
    </Row>
  )
}

export function CoursesTable() {
  const { data: courses } = useSuspenseQuery<CoursesRes>({
    queryKey: ["/course", "all"],
  })

  console.log(courses)

  return (
    <Card.Root variant="outline">
      <Card.Body>
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Row>
              <Table.ColumnHeader>Course code</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Number of applicants</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Row>
          </Table.Header>
          <Table.Body>
            {courses.map((course) => (
              <TableRow key={course.id} course={course} />
            ))}
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </Card.Root>
  )
}
