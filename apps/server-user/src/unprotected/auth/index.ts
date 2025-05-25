// noinspection JSUnusedLocalSymbols

import express, { ErrorRequestHandler } from "express"
import { randomBytes } from "node:crypto"

import { AccountDetails } from "@repo/database/types/Account"
import { AccountType, Availability } from "@repo/types/enums"
import { entityManager } from "@repo/database/datasource"
import { AccountSession } from "@repo/database/entities/accountSession"
import { Account } from "@repo/database/entities/account"
import { throwError } from "@/protected/util/throwError"

export const authRoutes = express.Router()

const nextYear = () =>
  new Date(new Date().setFullYear(new Date().getFullYear() + 1))

const generateToken = () => {
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  return Buffer.from(randomBytes(56)).toString("hex")
}

authRoutes.post("/auth/login", async (req, res) => {
  const newToken = generateToken()

  const user = await entityManager
    .findOneByOrFail(Account, {
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    })
    .catch((err) => {
      return throwError(
        "Unable to find username or password. Please try again",
        err
      )
    })

  await entityManager.save(
    entityManager.create(AccountSession, {
      token: newToken,
      account: user,
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
  console.log(err instanceof AggregateError)
  if (err instanceof AggregateError) throw err
  else throw new AggregateError([err], "Failed to login. Please try again")
}

authRoutes.use(errorHandler)
