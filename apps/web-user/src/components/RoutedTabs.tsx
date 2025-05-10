import { For, Link as ChakraLink, Tabs } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "@emotion/styled"
import { ReactNode } from "react"

const StyledLink = styled(Link)`
  outline: 0;
`

function Tab({
  value,
  children,
  routeRoot,
}: {
  value: string
  children: React.ReactNode
  routeRoot: string
}) {
  return (
    <Tabs.Trigger value={value} asChild>
      <ChakraLink asChild>
        <StyledLink href={`${routeRoot}${value}`}>{children}</StyledLink>
      </ChakraLink>
    </Tabs.Trigger>
  )
}

/**
 * Must be used on a route that has [tab], like pages/example/[tab].tsx
 * Tab content is to be included as children like <Tabs.Content value="reading"><Tab1/></Tabs.Content>
 */
export function RoutedTabs({
  tabs,
  routeRoot,
}: {
  tabs: { key: string; text: string; content: ReactNode }[]
  routeRoot: string
}) {
  const {
    query: { tab: tabKey },
    isReady,
  } = useRouter()

  if (!isReady) return null

  return (
    <Tabs.Root value={tabKey ? (tabKey as string) : tabs[0]?.key}>
      <Tabs.List>
        <For each={tabs}>
          {({ key: tKey, text: tTxt }) => (
            <Tab routeRoot={routeRoot} key={tKey} value={tKey}>
              {tTxt}
            </Tab>
          )}
        </For>
      </Tabs.List>
      <For each={tabs}>
        {({ key: tKey, content }) => (
          <Tabs.Content key={tKey} value={tKey}>
            {content}
          </Tabs.Content>
        )}
      </For>
    </Tabs.Root>
  )
}
