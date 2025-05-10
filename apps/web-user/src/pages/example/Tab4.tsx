import { Card, Code, Heading, HStack, List, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const sourceCodeExample = `\
/* example tabs */
import Tab1 from "@/pages/example/Tab1"
import Tab2 from "@/pages/example/Tab2"
import Tab3 from "@/pages/example/Tab3"
import { RoutedTabs } from "@/components/RoutedTabs"

export default function Route () {
  return (
    <RoutedTabs routeRoot="/example/" tabs={[
      { key: "reading", text: "Reading data", content: <Tab1/> },
      { key: "writing", text: "Writing data", content: <Tab2/> },
      { key: "form", text: "Using forms", content: <Tab3/> },
    ]}/>
  )
}
`;

const CardRoot = styled(Card.Root)`
  flex: 1 150px;
  min-width: 270px;
`;

const CardBody = styled(Card.Body)`
  & > * {
    margin-bottom: 1rem;
  }
`;

export default function Tab4() {
  return (
    <>
      <HStack alignContent="stretch" alignItems="stretch" wrap="wrap">
        <CardRoot>
          <Card.Header>
            <Heading>Hi</Heading>
          </Card.Header>
          <CardBody>
            <Text>
              I&#39;ve created a tabs component that will interface with the
              nextjs pages router.
            </Text>
            <Text>
              Start by creating a route at <Code>/tutor/[tab].tsx</Code>, and
              another at <Code>/tutor/index.tsx</Code>. The tab route will house
              the code you see on the right or blow, while index.tsx should just
              render the tab route.
            </Text>
            <Text>
              It is essential that the route name is <Code>[tab]</Code>, as:
            </Text>
            <List.Root>
              <List.Item>
                <Text>
                  Nextjs uses <Code>[]</Code> syntax for dynamic routing
                </Text>
              </List.Item>
              <List.Item>
                <Text>
                  <Code>RoutedTabs</Code> checks only for the <Code>tab</Code>{" "}
                  parameter
                </Text>
              </List.Item>
            </List.Root>
          </CardBody>
        </CardRoot>
        <Code
          display="block"
          whiteSpace="pre"
          style={{ padding: "10px", flexGrow: 1 }}
        >
          {sourceCodeExample}
        </Code>
      </HStack>
    </>
  );
}
