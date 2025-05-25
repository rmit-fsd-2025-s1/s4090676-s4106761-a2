export function throwError(msg: string, err?: Error): never {
  throw new AggregateError([err], msg)
}
