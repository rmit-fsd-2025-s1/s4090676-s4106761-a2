import { Response } from "express"
import { throwError } from "@/protected/util/throwError"

export function throwUnauthorized(res: Response) {
  res.status(401)
  throwError("Action unauthorized at this time")
}
