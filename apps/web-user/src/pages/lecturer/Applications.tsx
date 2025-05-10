import { ReactNode } from "react"
import { Show } from "@chakra-ui/react"
import { ApplicationsView } from "@/features/LecturerApplications/ApplicationsView"
import { SortModes } from "@/hooks/applications/useApplications"

/**
 *  The applications feature is responsible for /lecturer/applications/[courseId]/rank
 *  The index.tsx of each of those routes contains a component that is passed as children into Applications
 *  If children is not defined then we are at the root, /lecturer/applications/
 */
export function Applications({ children }: { children: ReactNode }) {
  return (
    <>
      <Show when={!children} fallback={children}>
        <ApplicationsView defaultFilters={{ sort: SortModes.RANK }} />
      </Show>
    </>
  )
}
