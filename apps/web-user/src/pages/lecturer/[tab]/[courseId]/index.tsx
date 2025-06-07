import LecturerRouteRoot from "@/pages/lecturer/[tab]"
import { ApplicationsView } from "@/features/LecturerApplications/ApplicationsView"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button, ButtonGroup, Flex } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { SortModes } from "@/hooks/applications/useLecturerApplications"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApplicationStatus } from "@repo/types/enums"
import { createMutation } from "@/hooks/api/useApi"
import {
  UpdateManyApplications,
  UpdateManyApplicationsRes,
} from "@repo/types-api/userApi"

const PositionEnd = styled(Flex)`
  width: 100%;
  flex-direction: row-reverse;
  margin-top: 20px;
`

export default function LecturerIndex() {
  const {
    isReady,
    query: { courseId },
  } = useRouter()
  const [selectedApplications, setSelected] = useState<string[]>([])
  const queryClient = useQueryClient()

  const updateManyApplications = useMutation({
    ...createMutation<UpdateManyApplications, UpdateManyApplicationsRes>({
      path: "/updateMany/applications",
    }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] })
    },
  })

  if (!isReady) return null

  const setApplications = (status: ApplicationStatus) => {
    updateManyApplications
      .mutateAsync({
        selectedApplications,
        updates: { status },
      })
      .then(() => {
        setSelected([])
      })
  }

  return (
    <LecturerRouteRoot>
      <ApplicationsView
        defaultFilters={{
          courseId: courseId as string,
          sort: SortModes.COURSE,
        }}
        selectionState={[selectedApplications, setSelected]}
      />
      <PositionEnd>
        <ButtonGroup size="xl">
          <Button
            disabled={!selectedApplications.length}
            onClick={() => setApplications(ApplicationStatus.REJECTED)}
          >
            Reject selection
          </Button>
          <Button
            disabled={!selectedApplications.length}
            onClick={() => setApplications(ApplicationStatus.ACCEPTED)}
          >
            Accept selection
          </Button>
        </ButtonGroup>
      </PositionEnd>
    </LecturerRouteRoot>
  )
}
