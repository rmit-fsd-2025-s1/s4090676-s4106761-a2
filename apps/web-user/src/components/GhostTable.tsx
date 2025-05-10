import { For, Table } from "@chakra-ui/react"
import styled from "@emotion/styled"

const Cell = styled(Table.Cell)`
  text-wrap: nowrap;
  border: none;
  background-color: inherit;
`

const Row = styled(Table.Row)`
  background-color: inherit;
`

export function GhostTable({ object }: { object: { [key: string]: string } }) {
  return (
    <Table.Root size="sm">
      <Table.Body>
        <For each={Object.entries(object)}>
          {([key, value]) => (
            <Row>
              <Cell>{key}</Cell>
              <Cell>{value}</Cell>
            </Row>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  )
}
