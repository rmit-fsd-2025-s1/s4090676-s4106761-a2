// noinspection JSUnusedLocalSymbols

import express from "express"
import { throwUnauthorized } from "@/util/throwUnauthorized"
import { entityManager } from "@repo/database/datasource"
import { AccountSession } from "@repo/database/entities/accountSession"
import { userRoutes } from "@/protected/user"
import { tutorRouter } from "@/routes/tutor.routes"
import { courseRoutes } from "@/protected/course"
import { applicationRoutes } from "@/protected/application"

export const protectedRoutes = express.Router()

protectedRoutes.use(async (req, res, next) => {
  const token = req.cookies?.access_token
  if (!token) throwUnauthorized(res)

  res.locals = {
    accountSession: await entityManager.findOneByOrFail(AccountSession, {
      token,
    }),
  }

  next()
})

protectedRoutes.use("/user", userRoutes)
protectedRoutes.use("/course", courseRoutes)
protectedRoutes.use("/application", applicationRoutes)
protectedRoutes.use("/tutors", tutorRouter)
