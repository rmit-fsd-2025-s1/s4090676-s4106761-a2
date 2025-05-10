import { useStore } from "@/hooks/localstorage/useStore"
import { ApplicationStatus } from "@/context/localstorage/enums"
import { z } from "zod"
import { useWatchForm } from "@/hooks/useWatchForm"

export enum SortModes {
  COURSE = "COURSE",
  RANK = "RANK",
  AVAILABILITY = "AVAILABILITY",
}

export const applicationFilterSortZ = z.object({
  sort: z.enum([SortModes.RANK, SortModes.COURSE, SortModes.AVAILABILITY]),
  search: z.string(),
  courseId: z.string(),
  status: z.enum([
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
    ApplicationStatus.REJECTED,
  ]),
})
export type ApplicationFilterSorts = Partial<
  z.infer<typeof applicationFilterSortZ>
>

export function useApplications() {
  let [applications] = useStore("applications")
  const [tutors] = useStore("tutorAccounts")
  const [courses] = useStore("courses")
  const controls = useWatchForm<ApplicationFilterSorts>()

  /* filters */
  if (controls.courseId)
    applications = applications.filter((a) => a.courseId === controls.courseId)
  if (controls.status)
    applications = applications.filter((a) => a.status === controls.status)
  if (controls.search) {
    const query = controls.search.toLowerCase()

    applications = applications.filter(
      (app) =>
        courses
          .find((c) => c.id === app.courseId)
          ?.name.toLowerCase()
          .includes(query) ||
        tutors
          .find((t) => t.id === app.tutorId)
          ?.name.toLowerCase()
          .includes(query) ||
        tutors
          .find((t) => t.id === app.tutorId)
          ?.availability?.toLowerCase()
          .includes(query) ||
        app.status?.toLowerCase().includes(query)
    )
  }

  /* sorting */
  switch (controls.sort) {
    case SortModes.COURSE:
      /**
       * Resolve the course and its code to sort the applications
       */
      applications.sort((a, b) => {
        const aAv = courses.find((t) => t.id === a.courseId)?.code
        const bAv = courses.find((t) => t.id === b.courseId)?.code
        return (aAv ?? "").localeCompare(bAv ?? "")
      })
      break
    case SortModes.AVAILABILITY:
      /**
       * Resolve the tutor and their availability to sort the applications
       */
      applications.sort((a, b) => {
        const aAv = tutors.find((t) => t.id === a.tutorId)?.availability
        const bAv = tutors.find((t) => t.id === b.tutorId)?.availability
        return (aAv ?? "").localeCompare(bAv ?? "")
      })
      break
    case SortModes.RANK:
      // as is, the data is stored in its rank
      break
  }

  return applications
}
