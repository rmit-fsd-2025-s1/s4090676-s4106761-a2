import { ReactNode } from "react";
import { Card, Heading } from "@chakra-ui/react";

export function CardHeader({ children }: { children: ReactNode }) {
  return (
    <Card.Header>
      <Heading size="lg">{children}</Heading>
    </Card.Header>
  );
}
