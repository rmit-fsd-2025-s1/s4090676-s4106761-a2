// noinspection JSUnusedLocalSymbols

import express from "express"
import { throwUnauthorized } from "@/protected/util/throwUnauthorized"
import { getQueryBuilder } from "@repo/database/datasource"
import { AccountSession } from "@repo/database/entities/accountSession"
import { LecturerAccount } from "@repo/database/entities/lecturerAccount"

export const protectedRoutes = express.Router()

protectedRoutes.use(async (req, res, next) => {
  const token = req.cookies?.access_token
  if (!token) throwUnauthorized(res)

  const session = await getQueryBuilder()
    .relation(AccountSession, "lecturerAccount")
    .of(token)
    .loadOne<LecturerAccount>()

  next()
})
