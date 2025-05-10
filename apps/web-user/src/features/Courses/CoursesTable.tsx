import { Button, Card, Table } from "@chakra-ui/react";
import { useStore } from "@/hooks/localstorage/useStore";
import Link from "next/link";
import styled from "@emotion/styled";
import { RightArrowIcon } from "@/icons/RightArrow";
import { Course } from "@/context/localstorage/types";

const SmallButton = styled(Button)`
  height: unset;
  padding: 4px;
  margin: 0;
`;

const Row = styled(Table.Row)`
  background-color: inherit;
`;

function TableRow({ course }: { course: Course }) {
  const [applications] = useStore("applications");
  const count = applications.reduce(
    (a, p) => a + (p.courseId === course.id ? 1 : 0),
    0,
  );
  return (
    <Row key={course.id}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.name}</Table.Cell>
      <Table.Cell>{count}</Table.Cell>
      <Table.Cell textAlign="end">
        <SmallButton asChild>
          <Link href={`/lecturer/courses/${course.id}`}>
            See applicants
            <RightArrowIcon />
          </Link>
        </SmallButton>
      </Table.Cell>
    </Row>
  );
}

export function CoursesTable() {
  const [courses] = useStore("courses");

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
  );
}
