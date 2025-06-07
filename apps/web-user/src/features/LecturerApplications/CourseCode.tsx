import { DetailedTableItem } from "@/components/DetailedTableItem"
import { Course } from "@repo/database/entities/course"

export function CourseCode({ course }: { course: undefined | Course }) {
  const courseData = course && {
    Code: course.code,
    Name: course.name,
  }

  return (
    <DetailedTableItem details={courseData}>{course?.name}</DetailedTableItem>
  )
}
