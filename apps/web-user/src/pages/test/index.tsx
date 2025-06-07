import { useSuspenseQuery } from "@tanstack/react-query"
import { Course } from "@repo/database/entities/course"

export default function Route() {
  const { data: courses } = useSuspenseQuery<Course[]>({
    queryKey: ["/course", "all"],
  })

  return <p>{JSON.stringify(courses)}</p>
}
