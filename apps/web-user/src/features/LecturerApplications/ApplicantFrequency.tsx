import { IconButton, Table } from "@chakra-ui/react"
import { CircleIcon } from "@/icons/Circle"
import FittedPopover from "@/components/FittedPopover"
import { ApplicationsRes } from "@repo/types-api/userApi"

export function ApplicantFrequency({
  application,
}: {
  application: ApplicationsRes[0]
}) {
  const { frequency, frequencyPercent } = application

  const color = `rgb(${(1 - frequencyPercent) * 256}, ${frequencyPercent * 200}, 0)`

  return (
    <Table.Cell>
      <FittedPopover.Root>
        <FittedPopover.Trigger>
          <IconButton size="sm" variant="ghost">
            <CircleIcon color={frequency === 0 ? "rgb(0, 0, 0)" : color} />
          </IconButton>
        </FittedPopover.Trigger>
        <FittedPopover.Body>{frequency}</FittedPopover.Body>
      </FittedPopover.Root>
    </Table.Cell>
  )
}
