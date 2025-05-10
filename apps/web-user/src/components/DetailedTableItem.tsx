// noinspection CssUnresolvedCustomProperty

import { Table, Text } from "@chakra-ui/react"
import FittedPopover from "@/components/FittedPopover"
import { GhostTable } from "@/components/GhostTable"
import styled from "@emotion/styled"
import { ComponentProps } from "react"

const HoverText = styled(Text)`
  vertical-align: middle;
  text-wrap: nowrap;
  padding: var(--chakra-spacing-1);
  border-radius: var(--chakra-radii-l2);
  width: fit-content;
  cursor: pointer;

  &:hover {
    background: var(--chakra-colors-bg-muted);
    --bg-currentcolor: var(--chakra-colors-bg-muted);
  }
`

/**
 * Display a table item with a context popover for when there isn't enough horizontal space
 */
export function DetailedTableItem({
  children,
  details,
}: {
  details: ComponentProps<typeof GhostTable>["object"] | undefined
  children: string | undefined
}) {
  return (
    <Table.Cell>
      <FittedPopover.Root>
        <FittedPopover.Trigger>
          <HoverText>{children}</HoverText>
        </FittedPopover.Trigger>
        <FittedPopover.Body>
          <GhostTable object={details ?? {}} />
        </FittedPopover.Body>
      </FittedPopover.Root>
    </Table.Cell>
  )
}
