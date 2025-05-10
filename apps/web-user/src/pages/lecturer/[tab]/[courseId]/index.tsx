import LecturerRouteRoot from "@/pages/lecturer/[tab]"
import { ApplicationsView } from "@/features/LecturerApplications/ApplicationsView"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button, ButtonGroup, Flex } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { ApplicationStatus } from "@/context/localstorage/enums"
import { useStore } from "@/hooks/localstorage/useStore"
import { Application } from "@/context/localstorage/types"
import { SortModes } from "@/hooks/applications/useApplications"

const PositionEnd = styled(Flex)`
    width: 100%;
    flex-direction: row-reverse;
    margin-top: 20px;
`

export default function LecturerIndex () {
  const { isReady, query: { courseId } } = useRouter()
  const [selectedApplications, setSelected] = useState<string[]>([])
  const [applicationsStore, setApplication] = useStore("applications")

  if (!isReady) return null

  const setApplications = (status: ApplicationStatus) => {
    selectedApplications.forEach((id: string) => {
      setApplication({
        ...applicationsStore.find((a) => a.id === id) as Application,
        status,
      })
    })
    setSelected([])
  }

  return <LecturerRouteRoot>
    <ApplicationsView
      defaultFilters={{ courseId: courseId as string, sort: SortModes.COURSE }}
      selectionState={[selectedApplications, setSelected]}/>
    <PositionEnd>
      <ButtonGroup size="xl">
        <Button disabled={!selectedApplications.length}
                onClick={() => setApplications(ApplicationStatus.REJECTED)}>
          Reject selection
        </Button>
        <Button disabled={!selectedApplications.length}
                onClick={() => setApplications(ApplicationStatus.ACCEPTED)}>
          Accept selection
        </Button>
      </ButtonGroup>
    </PositionEnd>
  </LecturerRouteRoot>
}
