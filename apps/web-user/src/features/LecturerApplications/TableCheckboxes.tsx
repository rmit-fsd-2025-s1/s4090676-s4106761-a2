import { Application } from "@/context/localstorage/types"
import { Dispatch, SetStateAction } from "react"
import { Checkbox, Table } from "@chakra-ui/react"

export function MasterCheckbox ({
  applications,
  selectionState,
}: {
  applications: Application[]
  selectionState?: [string[], Dispatch<SetStateAction<string[]>>]
}) {
  if (!selectionState) return null
  const [selection, setSelection] = selectionState
  return (
    <Table.ColumnHeader w="6">
      <Checkbox.Root
        size="sm"
        top="0.5"
        aria-label="Select all rows"
        checked={((selection.length > 0) && (selection.length < applications.length)) ? "indeterminate" : selection.length > 0}
        onCheckedChange={(changes) => {
          setSelection(
            changes.checked ? applications.map((application) => application.id) : [],
          )
        }}
      >
        <Checkbox.HiddenInput/>
        <Checkbox.Control/>
      </Checkbox.Root>
    </Table.ColumnHeader>
  )
}

export function RowCheckbox ({
  application,
  selectionState,
}: {
  application: Application
  selectionState?: [string[], Dispatch<SetStateAction<string[]>>]
}) {
  if (!selectionState) return null
  const [selection, setSelection] = selectionState

  return (
    <Table.Cell>
      <Checkbox.Root
        size="sm"
        top="0.5"
        aria-label="Select row"
        checked={selection.includes(application.id)}
        onCheckedChange={(changes) => {
          setSelection((prev) =>
            changes.checked
            ? [...prev, application.id]
            : selection.filter((id) => id !== application.id),
          )
        }}
      >
        <Checkbox.HiddenInput/>
        <Checkbox.Control/>
      </Checkbox.Root>
    </Table.Cell>
  )
}
