import { IconButton, Table } from "@chakra-ui/react";
import { Application } from "@/context/localstorage/types";
import { useApplicantFrequency } from "@/hooks/applications/useApplicantFrequency";
import { CircleIcon } from "@/icons/Circle";
import FittedPopover from "@/components/FittedPopover";

export function ApplicantFrequency({
  application,
}: {
  application: Application;
}) {
  const [frequency, frequencyPercent] = useApplicantFrequency(
    application.tutorId,
  );
  const color = `rgb(${(1 - frequencyPercent) * 256}, ${frequencyPercent * 200}, 0)`;

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
  );
}
