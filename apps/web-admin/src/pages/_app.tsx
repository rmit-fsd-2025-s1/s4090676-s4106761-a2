import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "@/components/ui/provider"
import { ErrorBoundary } from "react-error-boundary"
import { ClientOnly } from "@chakra-ui/react"
import { AppLayout } from "web-user/src/layouts/AppLayout"
import { Suspense } from "react"
import { Toaster } from "web-user/src/components/ui/toaster"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:4000/graphql",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      fallback={
        <p>Unfortunately, something has gone wrong. Please reload the page</p>
      }
    >
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </ErrorBoundary>
  )
}
