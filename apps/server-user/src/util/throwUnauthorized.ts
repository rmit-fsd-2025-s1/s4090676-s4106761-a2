import { Response } from "express"
import { throwError } from "@/util/throwError"

export function throwUnauthorized(res: Response, err?: unknown) {
  res.status(401)
  throwError("Action unauthorized at this time", err)
}
