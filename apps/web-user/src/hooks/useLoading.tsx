import { useState } from "react"

/**
 * Follow a promise to indicate if it has finished loading
 */
export function useLoading(): [boolean, (promise: Promise<unknown>) => void] {
  const [state, setState] = useState<boolean>(false)

  return [
    state,
    (promise: Promise<unknown>) => {
      setState(true)
      promise.finally(() => {
        setState(false)
      })
    },
  ]
}
