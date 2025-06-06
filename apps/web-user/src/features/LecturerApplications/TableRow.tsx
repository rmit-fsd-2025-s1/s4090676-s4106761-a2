import styled from "@emotion/styled"
import { Show, Table } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { RowCheckbox } from "@/features/LecturerApplications/TableCheckboxes"
import { RankingControl } from "@/features/LecturerApplications/RankingControl"
import { ApplicantFrequency } from "@/features/LecturerApplications/ApplicantFrequency"
import { EditableNote } from "@/features/LecturerApplications/EditableNote"
import { CourseCode } from "@/features/LecturerApplications/CourseCode"
import { TutorName } from "@/features/LecturerApplications/TutorName"

export const Row = styled(Table.Row)`
  background-color: inherit;
`

export function TableRow({
  application,
  selectionState,
  allowRanking,
}: {
  application: Application
  selectionState: [string[], Dispatch<SetStateAction<string[]>>] | undefined
  allowRanking: boolean
}) {
  // FIXME
  const course = null
  const tutor = null

  return (
    <Row>
      <Show when={allowRanking}>
        <RankingControl application={application} />
      </Show>
      <RowCheckbox application={application} selectionState={selectionState} />
      <CourseCode course={course} />
      <Show when={!!tutor}>
        <TutorName tutor={tutor!} />
      </Show>
      <Table.Cell>
        {tutor?.availability ?? <span style={{ textWrap: "nowrap" }}>N/A</span>}
      </Table.Cell>
      <Table.Cell>{application?.status}</Table.Cell>
      <ApplicantFrequency application={application} />
      <EditableNote application={application} />
    </Row>
  )
}
