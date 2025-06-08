// noinspection JSUnusedLocalSymbols
import express from "express"
import { entityManager } from "@repo/database/datasource"
import {
  ApplicationReq,
  ApplicationsRes,
  UpdateApplicationsReq,
  UpdateApplicationsRes,
} from "@repo/types-api/userApi"
import { Application } from "@repo/database/entities/application"
import { getApplications } from "@repo/database/queries/getApplications"
import { AccountSession } from "@repo/database/entities/accountSession"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { ApplicationStatus } from "@repo/types/enums"
import { newApplicationSchema } from "@repo/validation/NewApplication"
import { patchApplicationsSchema } from "@repo/validation/PatchApplications"
import { updateApplications } from "@repo/database/queries/updateApplications"

export const applicationRoutes = express.Router()

applicationRoutes.post("/new", async (req, res) => {
  // validate body
  const requestBody = newApplicationSchema.parse(req.body as ApplicationReq)

  res.json(
    (await entityManager.save(
      entityManager.create(Application, {
        status: ApplicationStatus.PENDING,
        tutor: await entityManager.findOneByOrFail(TutorAccount, {
          account: (res.locals.accountSession as AccountSession).account,
        }),
        course: { id: requestBody.course },
        type: requestBody.type,
        comment: "",
      })
    )) satisfies Application
  )
})

applicationRoutes.get("/all", async (req, res) => {
  res.json((await getApplications()) satisfies ApplicationsRes)
})

applicationRoutes.get("/update", async (req, res) => {
  // validate body
  const requestBody = patchApplicationsSchema.parse(
    req.body as UpdateApplicationsReq
  )

  await updateApplications(
    requestBody.updates,
    requestBody.selectedApplications
  )

  res.json({} satisfies UpdateApplicationsRes)
})
