import { Editable, IconButton, Table } from "@chakra-ui/react"
import { PencilLineIcon } from "@/icons/PencilLine"
import { toaster } from "@/components/ui/toaster"
import { JSX } from "react"
import { Application } from "@repo/database/entities/application"
import { useMutation } from "@tanstack/react-query"
import { createMutation } from "@/hooks/api/useApi"

export function EditableNote({
  application,
}: {
  application: Application
}): JSX.Element {
  const updateApplication = useMutation({
    ...createMutation<Partial<Application>, void>({
      path: `/application/${application.id}`,
      options: {
        method: "PATCH",
      },
    }),
  })

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
              updateApplication
                .mutateAsync({ comment: e.target.value })
                .then(() => {
                  toaster.create({
                    description: "User note updated successfully",
                    type: "success",
                  })
                })
            }
          }}
        />
      </Editable.Root>
    </Table.Cell>
  )
}
