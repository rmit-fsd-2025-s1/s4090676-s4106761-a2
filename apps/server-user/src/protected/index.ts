import express from "express"
import { throwUnauthorized } from "@/protected/util/throwUnauthorized"
import { getQueryBuilder } from "@repo/database/datasource"
import { AuthSession } from "@repo/database/entities/authSession"
import { LecturerAccount } from "@repo/database/entities/lecturerAccount"

export const protectedRoutes = express.Router()

protectedRoutes.use(async (req, res, next) => {
  const token = req.cookies?.access_token
  if (!token) throwUnauthorized(res)

  const session = await getQueryBuilder()
    .relation(AuthSession, "lecturerAccount")
    .of(token)
    .loadOne<LecturerAccount>()

  next()
})
