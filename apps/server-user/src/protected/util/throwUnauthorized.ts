import { Response } from "express"

export function throwUnauthorized(res: Response) {
  res.status(401)
  throw new AggregateError([], "Action unauthorized at this time")
}
