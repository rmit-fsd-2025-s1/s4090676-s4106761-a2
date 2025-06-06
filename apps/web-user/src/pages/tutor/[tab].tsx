import { RoutedTabs } from "@/components/RoutedTabs"
import { Dashboard } from "@/features/TutorHome/Dashboard"
import { useRequireAccountType } from "@/hooks/user/useRequireAccountType"
import { AccountType } from "@repo/types/enums"

export default function TutorRoute() {
  const redirect = useRequireAccountType(AccountType.TUTOR)

  if (redirect) return redirect

  return (
    <RoutedTabs
      routeRoot="/tutor/"
      tabs={[
        { key: "dashboard", text: "Dashboard", content: <Dashboard /> },
        // { key: "applications", text: "Applications", content: <Applications/> },
      ]}
    />
  )
}
