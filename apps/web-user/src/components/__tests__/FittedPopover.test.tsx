import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { Card, CardHeader } from "@chakra-ui/react";
import FittedPopover from "../FittedPopover";

describe("Home page", () => {
  test("Content appears on page", () => {
    render(
      <Provider>
        <FittedPopover.Root>
          <FittedPopover.Trigger>
            <p>CONTENT</p>
          </FittedPopover.Trigger>
          <FittedPopover.Body title="TITLE">BODY</FittedPopover.Body>
        </FittedPopover.Root>
      </Provider>,
    );

    const text = screen.getByText(/CONTENT/i);

    expect(text).toBeDefined();
  });

  test("BODY appears on page", () => {
    render(
      <Provider>
        <FittedPopover.Root>
          <FittedPopover.Trigger>
            <p>CONTENT</p>
          </FittedPopover.Trigger>
          <FittedPopover.Body title="TITLE">BODY</FittedPopover.Body>
        </FittedPopover.Root>
      </Provider>,
    );

    const text = screen.getByText(/BODY/i);

    expect(text).toBeDefined();
  });

  test("Title appears on page", () => {
    render(
      <Provider>
        <FittedPopover.Root>
          <FittedPopover.Trigger>
            <p>CONTENT</p>
          </FittedPopover.Trigger>
          <FittedPopover.Body title="TITLE">BODY</FittedPopover.Body>
        </FittedPopover.Root>
      </Provider>,
    );

    const text = screen.getByText(/TITLE/i);

    expect(text).toBeDefined();
  });
});
