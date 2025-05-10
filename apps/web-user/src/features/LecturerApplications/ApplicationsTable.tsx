import { Show, Table } from "@chakra-ui/react";
import {
  ApplicationFilterSorts,
  SortModes,
  useApplications,
} from "@/hooks/applications/useApplications";
import { Dispatch, SetStateAction } from "react";
import { MasterCheckbox } from "@/features/LecturerApplications/TableCheckboxes";
import { Row, TableRow } from "@/features/LecturerApplications/TableRow";
import { useWatchForm } from "@/hooks/useWatchForm";

/**
 * @param selectionState useState() for tracking selected rows
 */
export function ApplicationsTable({
  selectionState,
}: {
  selectionState?: [string[], Dispatch<SetStateAction<string[]>>];
}) {
  const { sort } = useWatchForm<ApplicationFilterSorts>();
  const applications = useApplications();

  /* Ranking must take place on the unfiltered list */
  const allowRanking = sort === SortModes.RANK;

  return (
    <Table.Root size="sm" interactive>
      <Table.Header>
        <Row>
          <Show when={allowRanking}>
            <Table.ColumnHeader w="20">Order</Table.ColumnHeader>
          </Show>
          <MasterCheckbox
            applications={applications}
            selectionState={selectionState}
          />
          <Table.ColumnHeader>Course name</Table.ColumnHeader>
          <Table.ColumnHeader>Tutor Name</Table.ColumnHeader>
          <Table.ColumnHeader>Tutor Availability</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader>No. Accepted</Table.ColumnHeader>
          <Table.ColumnHeader width="400px">Comment</Table.ColumnHeader>
        </Row>
      </Table.Header>
      <Table.Body>
        {applications.map((application) => (
          <TableRow
            key={application.id}
            application={application}
            selectionState={selectionState}
            allowRanking={allowRanking}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
