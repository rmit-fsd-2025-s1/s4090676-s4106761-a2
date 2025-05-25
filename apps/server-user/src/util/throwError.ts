export function throwError(msg: string, err?: unknown): never {
  throw new AggregateError([err], msg)
}
