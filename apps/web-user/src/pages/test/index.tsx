import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { ApplicationReq, ApplicationsRes } from "@repo/types-api/userApi"
import { createMutation } from "@/hooks/api/useApi"
import { Application } from "@repo/database/entities/application"
import { ApplicationType } from "@repo/types/enums"

export default function Route() {
  const { data: applications } = useSuspenseQuery<ApplicationsRes>({
    queryKey: ["/user", "applications"],
  })
  const putApplication = useMutation({
    ...createMutation<ApplicationReq, Application>({
      path: "/application/new",
    }),
  })

  return (
    <>
      <button
        onClick={() =>
          putApplication.mutate({
            type: ApplicationType.TUTOR,
            course: "9913dd1c-3663-4aca-a1ea-df4c60efab9c",
          })
        }
      >
        create application
      </button>
      <p>{JSON.stringify(applications)}</p>
    </>
  )
}
