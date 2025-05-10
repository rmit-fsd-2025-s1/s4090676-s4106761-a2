import { Popover, Portal } from "@chakra-ui/react";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const PopoverContent = styled(Popover.Content)`
  width: min-content;
`;

const PopoverTitle = styled(Popover.Title)`
  margin-top: 5px;
  font-weight: 600;
`;

function Root({ children }: { children: ReactNode }) {
  return <Popover.Root>{children}</Popover.Root>;
}

function Trigger({ children }: { children: ReactNode }) {
  return <Popover.Trigger asChild>{children}</Popover.Trigger>;
}

function Body({ title, children }: { children: ReactNode; title?: string }) {
  return (
    <Portal>
      <Popover.Positioner>
        <PopoverContent>
          <Popover.Arrow />
          <Popover.Body>
            {title && <PopoverTitle>{title}</PopoverTitle>}
            {children}
          </Popover.Body>
        </PopoverContent>
      </Popover.Positioner>
    </Portal>
  );
}

const FittedPopover = {
  Root,
  Trigger,
  Body,
};

export default FittedPopover;
