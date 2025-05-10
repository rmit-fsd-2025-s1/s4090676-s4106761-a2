import { RoutedTabs } from "@/components/RoutedTabs"
import { Dashboard } from "@/pages/tutor/Dashboard"
import { useRequireAccountType } from "@/hooks/user/useRequireAccountType"
import { AccountType } from "@/context/localstorage/enums"

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
