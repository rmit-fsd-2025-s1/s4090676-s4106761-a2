// noinspection JSUnusedLocalSymbols
import express from "express"
import { entityManager } from "@repo/database/datasource"
import { Account } from "@repo/database/entities/account"
import { getAccountDetails } from "@repo/database/queries/getAccountDetails"
import { AccountSession } from "@repo/database/entities/accountSession"
import { lecturerSchema, tutorSchema } from "@repo/validation/UpdateUser"
import { ApplicationsRes } from "@repo/types-api/userApi"
import { getApplications } from "@repo/database/queries/getApplications"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { LecturerAccount } from "@repo/database/entities/lecturerAccount"
import { getTutorStats } from "@repo/database/queries/getUsers"
import { TutorStatsRes } from "@repo/types/tutorStats"

export const userRoutes = express.Router()

userRoutes.get("/", async (req, res) => {
  res.json(
    await getAccountDetails(
      (res.locals.accountSession as AccountSession).account
    )
  )
})

userRoutes.get("/tutorStats", async (req, res) => {
  res.json((await getTutorStats()) satisfies TutorStatsRes)
})

userRoutes.patch("/", async (req, res) => {
  const account = (res.locals.accountSession as AccountSession).account

  if (account.type === "TUTOR") {
    tutorSchema.parse(req.body)

    const tutor = await entityManager.findOneByOrFail(TutorAccount, {
      account: { id: account.id },
    })

    await entityManager.update(TutorAccount, tutor.id, req.body)
  } else if (account.type === "LECTURER") {
    lecturerSchema.parse(req.body)

    await entityManager.update(Account, account.id, req.body)
  }

  res.json({})
})

userRoutes.get("/applications", async (req, res) => {
  // as a tutor and as a lecturer you get a different response
  const { type, id } = (res.locals.accountSession as AccountSession).account
  if (type === "TUTOR") {
    const tutor = await entityManager.findOneByOrFail(TutorAccount, {
      account: (res.locals.accountSession as AccountSession).account,
    })
    res.json(
      (await getApplications({ tutorId: tutor.id })) satisfies ApplicationsRes
    )
  } else if (type === "LECTURER") {
    const lecturer = await entityManager.findOneByOrFail(LecturerAccount, {
      account: (res.locals.accountSession as AccountSession).account,
    })
    res.json(
      (await getApplications({
        lecturerId: lecturer.id,
      })) satisfies ApplicationsRes
    )
  } else {
    throw new Error("Wrong account type")
  }
})

userRoutes.get("/:userId", async (req, res) => {
  const account = await entityManager.findOneByOrFail(Account, {
    id: req.params.userId,
  })

  res.json(await getAccountDetails(account))
})
