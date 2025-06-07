import { throwError } from "@/util/throwError"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throwUnauthorized(res: any, err?: unknown) {
  res.status(401)
  throwError("Action unauthorized at this time", err)
}
