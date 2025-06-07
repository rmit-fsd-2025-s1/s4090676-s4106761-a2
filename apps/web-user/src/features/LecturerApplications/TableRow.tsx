import styled from "@emotion/styled"
import { Show, Table } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { RowCheckbox } from "@/features/LecturerApplications/TableCheckboxes"
import { ApplicantFrequency } from "@/features/LecturerApplications/ApplicantFrequency"
import { EditableNote } from "@/features/LecturerApplications/EditableNote"
import { CourseCode } from "@/features/LecturerApplications/CourseCode"
import { TutorName } from "@/features/LecturerApplications/TutorName"
import { ApplicationsRes } from "@repo/types-api/userApi"

export const Row = styled(Table.Row)`
  background-color: inherit;
`

export function TableRow({
  application,
  selectionState,
}: {
  application: ApplicationsRes[0]
  selectionState: [string[], Dispatch<SetStateAction<string[]>>] | undefined
  allowRanking: boolean
}) {
  const course = application.course
  const tutor = application.tutor

  return (
    <Row>
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
