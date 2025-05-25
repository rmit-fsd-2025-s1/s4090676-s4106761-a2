import express, { ErrorRequestHandler } from "express"
import { randomBytes } from "node:crypto"

import { AccountDetails } from "@repo/database/types/Account"
import { AccountType, Availability } from "@repo/types/enums"
import { entityManager } from "@repo/database/datasource"
import { AuthSession } from "@repo/database/entities/authSession"

export const authRoutes = express.Router()

const nextYear = () =>
  new Date(new Date().setFullYear(new Date().getFullYear() + 1))

const generateToken = () => {
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  return Buffer.from(randomBytes(56)).toString("hex")
}

authRoutes.post("/auth/login", async (req, res) => {
  const newToken = generateToken()

  await entityManager.save(
    entityManager.create(AuthSession, {
      token: newToken,
    })
  )

  res
    .status(200)
    .cookie("access_token", newToken, {
      domain: req.body.domain,
      expires: nextYear(),
      httpOnly: true,
      /* includeCredentials still needs to be passed in the client fetch() options */
      sameSite: "none",
      /* Secure works on localhost http connections */
      secure: true,
    })
    .json({
      type: AccountType.TUTOR,
      availability: Availability.FULLTIME,
      name: "tim",
      email: "tim@tim.com",
      id: "test-id",
      skills: [],
      credentials: "",
    } satisfies AccountDetails)
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  throw new AggregateError([err], "Unable to create auth session at this time")
}

authRoutes.use(errorHandler)
