import { RadioCard } from "@chakra-ui/react"
import { ComponentProps, ReactNode } from "react"

export function RadioCardItem ({ children, ...props }: {
  children: ReactNode,
} & ComponentProps<typeof RadioCard.Item>) {
  return (
    <RadioCard.Item {...props}>
      <RadioCard.ItemHiddenInput/>
      <RadioCard.ItemControl>
        {children}
      </RadioCard.ItemControl>
    </RadioCard.Item>
  )
}
