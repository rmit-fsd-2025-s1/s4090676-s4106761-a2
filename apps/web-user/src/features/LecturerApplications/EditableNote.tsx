import { Editable, IconButton, Table } from "@chakra-ui/react";
import { PencilLineIcon } from "@/icons/PencilLine";
import { toaster } from "@/components/ui/toaster";
import { JSX } from "react";
import { Application } from "@/context/localstorage/types";
import { useApplication } from "@/hooks/localstorage/useApplication";

export function EditableNote({
  application,
}: {
  application: Application;
}): JSX.Element {
  const [, updateApplication] = useApplication(application.id);

  return (
    <Table.Cell>
      <Editable.Root textAlign="start" defaultValue={application?.comment}>
        <Editable.Preview />
        <Editable.EditTrigger asChild>
          <IconButton variant="outline" size="xs">
            <PencilLineIcon />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.Input
          onBlur={(e) => {
            if (updateApplication) {
              updateApplication({ comment: e.target.value });
            } else {
              toaster.create({
                description:
                  "Unable to update user note at this time. Please try again later",
                type: "error",
              });
            }
          }}
        />
      </Editable.Root>
    </Table.Cell>
  );
}
