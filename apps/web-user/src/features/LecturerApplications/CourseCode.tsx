import { Course } from "@/context/localstorage/types"
import { DetailedTableItem } from "@/components/DetailedTableItem"

export function CourseCode({ course }: { course: undefined | Course }) {
  const courseData = course && {
    Code: course.code,
    Name: course.name,
  }

  return (
    <DetailedTableItem details={courseData}>{course?.name}</DetailedTableItem>
  )
}
