import { Application, UUID } from "@/context/localstorage/types"
import { useStore } from "@/hooks/localstorage/useStore"
import { useMemo } from "react"
import { Semester } from "@/context/localstorage/enums"

/**
 * Combines with courses
 */
export function useUserApplications(targetTutor: UUID): (Application & {
  courseName: string
  courseCode: string
  semester: Semester
})[] {
  const [applications] = useStore("applications")
  const [courses] = useStore("courses")

  const applicantHistory = useMemo(() => {
    const frequencies: { [tutor: UUID]: Application[] } = {}
    applications.forEach((application: Application) => {
      const records = frequencies[application.tutorId]
      if (records) records.push(application)
      else frequencies[application.tutorId] = [application]
    })
    return frequencies
  }, [applications])

  return (applicantHistory[targetTutor] ?? []).map((a) => ({
    ...a,
    courseName: courses.find((c) => c.id === a.courseId)!.name,
    courseCode: courses.find((c) => c.id === a.courseId)!.code,
    semester: courses.find((c) => c.id === a.courseId)!.semester,
  }))
}
