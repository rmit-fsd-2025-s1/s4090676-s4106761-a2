import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "..";
import { Provider } from "@/components/ui/provider";

describe("Home page", () => {
  test("Title appears on page", () => {
    render(
      <Provider>
        <Home />
      </Provider>,
    );

    const text = screen.getByText(/Tutor Matching made easy/i);

    expect(text).toBeDefined();
  });
});
