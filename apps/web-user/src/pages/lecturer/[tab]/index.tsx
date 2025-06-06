import { RoutedTabs } from "@/components/RoutedTabs"
import { Applications } from "@/features/LecturerHome/Applications"
import { useRequireAccountType } from "@/hooks/user/useRequireAccountType"
import { ReactNode } from "react"
import { Courses } from "@/features/LecturerHome/Courses"

export default function LecturerRouteRoot({
  children,
}: {
  children?: ReactNode
}) {
  const redirect = useRequireAccountType(AccountType.LECTURER)

  if (redirect) return redirect

  return (
    <RoutedTabs
      routeRoot="/lecturer/"
      tabs={[
        {
          key: "courses",
          text: "Pending applications",
          content: <Courses>{children}</Courses>,
        },
        {
          key: "applications",
          text: "All Applications",
          content: <Applications>{children}</Applications>,
        },
      ]}
    />
  )
}
