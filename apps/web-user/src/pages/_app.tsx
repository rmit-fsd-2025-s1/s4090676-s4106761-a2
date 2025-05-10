import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { AppLayout } from "@/layouts/AppLayout"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"

/**
 * Prevent the provider from being rendered on the server side
 * This means the localstorage API will always be defined
 */
const LocalstorageProvider = dynamic(() =>
    import("../context/localstorage/LocalstorageProvider")
      .then((file) => file.LocalstorageProvider),
  { ssr: false },
)

export default function App ({ Component, pageProps }: AppProps) {
  // load in some example tutor and lecturer accounts if there are none already in local storage
  return (
    <LocalstorageProvider>
      <Provider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <Toaster/>
      </Provider>
    </LocalstorageProvider>
  )
}
