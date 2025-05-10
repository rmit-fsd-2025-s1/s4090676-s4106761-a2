import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "@/components/ui/provider"
import { Card, CardHeader } from "@chakra-ui/react"

describe("Home page", () => {
  test("Title appears on page", () => {
    render(
      <Provider>
        <Card.Root>
          <CardHeader>Hi I am a header</CardHeader>
        </Card.Root>
      </Provider>
    )

    const text = screen.getByText(/Hi I am a header/i)

    expect(text).toBeDefined()
  })
})
