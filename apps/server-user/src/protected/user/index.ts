// noinspection JSUnusedLocalSymbols
import express from "express"
import { entityManager } from "@repo/database/datasource"
import { Account } from "@repo/database/entities/account"
import { getAccountDetails } from "@repo/database/queries/getAccountDetails"

export const userRoutes = express.Router()

userRoutes.get("/:userId", async (req, res) => {
  const account = await entityManager.findOneByOrFail(Account, {
    id: req.params.userId,
  })

  res.json(await getAccountDetails(account))
})
