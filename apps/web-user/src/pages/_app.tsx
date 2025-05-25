import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { AppLayout } from "@/layouts/AppLayout"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { fetchApi } from "@/hooks/api/useApi"
import { AccountDetails } from "@repo/database/types/AccountDetails"

/**
 * Prevent the provider from being rendered on the server side
 * This means the localstorage API will always be defined
 */
const LocalstorageProvider = dynamic(
  () =>
    import("../context/localstorage/LocalstorageProvider").then(
      (file) => file.LocalstorageProvider
    ),
  { ssr: false }
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
      queryFn: ({ queryKey }) =>
        fetchApi({
          path: queryKey.join("/"),
        }) as Promise<AccountDetails>,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  // load in some example tutor and lecturer accounts if there are none already in local storage
  return (
    <ErrorBoundary
      fallback={
        <p>Unfortunately, something has gone wrong. Please reload the page</p>
      }
    >
      <QueryClientProvider client={queryClient}>
        <LocalstorageProvider>
          <Provider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
            <Toaster />
          </Provider>
        </LocalstorageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
