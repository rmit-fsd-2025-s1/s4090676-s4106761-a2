import { toaster } from "@/components/ui/toaster"

const LOGGING = false

type ToastConf = {
  successToast?: string
}

type ApiRequest = {
  path: string
  options?: RequestInit
} & ToastConf

export function fetchApi<T>({ path, options, ...others }: ApiRequest) {
  const fetchPromise = fetch(`http://localhost:3002${path}`, {
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
 * factory for useMutation
 */
export function createMutation<ReqParams, T>(req: ApiRequest) {
  return {
    mutationFn: (body: ReqParams) =>
      fetchApi<T>({
        ...req,
        options: {
          method: "POST",
          body: JSON.stringify(body),
          ...(req?.options || {}),
        },
      }),
  }
}
