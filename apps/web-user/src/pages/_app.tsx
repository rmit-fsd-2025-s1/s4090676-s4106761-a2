import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { AppLayout } from "@/layouts/AppLayout"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { fetchApi } from "@/hooks/api/useApi"
import { Suspense } from "react"
import { ClientOnly } from "@chakra-ui/react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
      queryFn: ({ queryKey }) =>
        fetchApi({
          path: queryKey.join("/"),
        }),
    },
    mutations: {
      retry: false,
      throwOnError: false,
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
        <Provider>
          <ClientOnly>
            <AppLayout>
              <Suspense fallback={<p>Loading...</p>}>
                <Component {...pageProps} />
              </Suspense>
            </AppLayout>
            <Toaster />
          </ClientOnly>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
