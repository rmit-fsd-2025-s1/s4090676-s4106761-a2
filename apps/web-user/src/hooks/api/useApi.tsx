import { use } from "react"
import { toaster } from "@/components/ui/toaster"

const LOGGING = false

type ToastConf = {
  successToast?: string
}

type ApiRequest = {
  path: string
  options?: RequestInit
} & ToastConf

function fetchApi<T>({ path, options, ...others }: ApiRequest) {
  const fetchPromise = fetch(`http://localhost:3001${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
    ...options,
  })

  return fetchPromise.then(async (res) => {
    const body = res.json().catch(() => ({}))
    if (LOGGING) console.log(await body)

    if (!res.ok) {
      toaster.error({
        title: (await body)?.message || "Request failed. Please try again",
      })
      throw new Error("API request failed")
    }

    if (others.successToast) {
      toaster.create({
        title: "Success",
        description: others.successToast,
      })
    }

    return body as Promise<T>
  })
}

/**
 * fetch wrapped in use()
 * i.e. use <Suspense fallback={} /> to make loading screens
 * @param req.path some route such as "/user" or "/auth/login"
 * @param req.options from fetch(path, options)
 */
export function useApi<T>(req: ApiRequest) {
  return use(fetchApi<T>(req))
}

/**
 * factory for fetch, defaulting to POST. Parameter of function is stringified and used as body
 * @param req.path some route such as "/user" or "/auth/login"
 * @param req.options from fetch(path, options)
 */
export function useAction<T>(req: ApiRequest) {
  return (body: any) =>
    fetchApi<T>({
      ...req,
      options: {
        method: "POST",
        body: JSON.stringify(body),
        ...req.options,
      },
    })
}
