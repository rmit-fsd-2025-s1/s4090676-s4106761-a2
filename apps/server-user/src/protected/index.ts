// noinspection JSUnusedLocalSymbols

import express from "express"
import { throwUnauthorized } from "@/util/throwUnauthorized"
import { entityManager } from "@repo/database/datasource"
import { AccountSession } from "@repo/database/entities/accountSession"
import { userRoutes } from "@/protected/user"

export const protectedRoutes = express.Router()

protectedRoutes.use(async (req, res, next) => {
  const token = req.cookies?.access_token
  if (!token) throwUnauthorized(res)

  // @ts-expect-error no typing for locals
  req.locals = {
    accountSession: await entityManager.findOneByOrFail(AccountSession, {
      token,
    }),
  }

  next()
})

protectedRoutes.use("/user", userRoutes)
