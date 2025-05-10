import Tab1 from "@/pages/example/Tab1"
import Tab2 from "@/pages/example/Tab2"
import Tab3 from "@/pages/example/Tab3"
import { RoutedTabs } from "@/components/RoutedTabs"
import Tab4 from "@/pages/example/Tab4"
import Tab5 from "@/pages/example/Tab5"

export default function Route() {
  return (
    <RoutedTabs
      routeRoot="/example/"
      tabs={[
        { key: "reading", text: "Reading data", content: <Tab1 /> },
        { key: "writing", text: "Writing data", content: <Tab2 /> },
        { key: "form", text: "Using forms", content: <Tab3 /> },
        { key: "tab", text: "Using tabs", content: <Tab4 /> },
        { key: "hooks", text: "Updating data", content: <Tab5 /> },
      ]}
    />
  )
}
