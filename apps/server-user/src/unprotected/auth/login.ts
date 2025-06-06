import express from "express"
import { randomBytes } from "node:crypto"

import { entityManager } from "@repo/database/datasource"
import { AccountSession } from "@repo/database/entities/accountSession"
import { Account } from "@repo/database/entities/account"
import { throwError } from "@/util/throwError"
import { getAccountDetails } from "@repo/database/queries/getAccountDetails"

const nextYear = () =>
  new Date(new Date().setFullYear(new Date().getFullYear() + 1))

const generateToken = () => {
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  return Buffer.from(randomBytes(56)).toString("hex")
}

export const loginRouter = express.Router()

loginRouter.post("/", async (req, res) => {
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

  const accountDetails = await getAccountDetails(user)

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
    .json(accountDetails)
})
