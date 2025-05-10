import { AppFooter } from "@/components/app/AppFooter"
import { ReactNode } from "react"
import { AppHeader } from "@/components/app/AppHeader"
import { AppMain } from "@/components/app/AppMain"
import { FullPageHeightLayout } from "@/layouts/FullPageHeightLayout"

export function AppLayout ({ children }: { children: ReactNode }) {
  return (
    <FullPageHeightLayout>
      <AppHeader/>
      <AppMain>
        {children}
      </AppMain>
      <AppFooter/>
    </FullPageHeightLayout>
  )
}
