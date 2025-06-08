import { z } from "zod"
import { useWatchForm } from "@/hooks/useWatchForm"
import { ApplicationStatus } from "@repo/types/enums"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ApplicationsRes } from "@repo/types-api/userApi"
import { serialiseSearchParams } from "@/util"
import { useDebounce } from "use-debounce"

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
  const [debouncedControls] = useDebounce(controls, 1000)

  const { data: applications } = useSuspenseQuery<ApplicationsRes>({
    queryKey: [
      "/application",
      "all",
      "?" + serialiseSearchParams(debouncedControls),
    ],
  })

  return applications
}
