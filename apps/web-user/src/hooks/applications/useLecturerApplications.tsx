import { z } from "zod"
import { useWatchForm } from "@/hooks/useWatchForm"
import { ApplicationStatus } from "@repo/types/enums"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Application } from "@repo/database/entities/application"
import { ApplicationsRes } from "@repo/types-api/userApi"

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

export function useLecturerApplications() {
  const controls = useWatchForm<ApplicationFilterSorts>()
  // FIXME: impl sorting and filtering on the API

  let { data: applications } = useSuspenseQuery<ApplicationsRes>({
    queryKey: ["/application", "all"],
  })

  return applications
}
