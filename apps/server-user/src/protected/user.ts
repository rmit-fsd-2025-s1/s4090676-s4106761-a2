// noinspection JSUnusedLocalSymbols
import express from "express"
import { entityManager } from "@repo/database/datasource"
import { Account } from "@repo/database/entities/account"
import { getAccountDetails } from "@repo/database/queries/getAccountDetails"
import { AccountSession } from "@repo/database/entities/accountSession"
import { tutorSchema } from "@repo/validation/UpdateUser"

export const userRoutes = express.Router()

userRoutes.get("/", async (req, res) => {
  res.json(
    await getAccountDetails(
      (res.locals.accountSession as AccountSession).account
    )
  )
})

userRoutes.patch("/", async (req, res) => {
  const account = (res.locals.accountSession as AccountSession).account

  if (account.type === "TUTOR") tutorSchema.parse(req.body)
  else if (account.type === "LECTURER") tutorSchema.parse(req.body)

  await entityManager.update(
    Account,
    (res.locals.accountSession as AccountSession).account,
    req.body
  )

  res.json({})
})

userRoutes.get("/:userId", async (req, res) => {
  const account = await entityManager.findOneByOrFail(Account, {
    id: req.params.userId,
  })

  res.json(await getAccountDetails(account))
})
