import { Field, RadioCard } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { ComponentProps } from "react"
import styled from "@emotion/styled"

const RadioCardRoot = styled(RadioCard.Root)`
  width: 100%;
`

export function RadioCards({
  name,
  fitContent,
  ...props
}: {
  name: string
  fitContent?: boolean
} & ComponentProps<typeof RadioCard.Root>) {
  const {
    formState: { errors },
    control,
  } = useFormContext() // retrieve those props

  const error = errors[name]

  return (
    <Field.Root
      invalid={!!error}
      style={fitContent ? { width: "fit-content" } : {}}
    >
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <RadioCardRoot
            onValueChange={(details) => onChange(details.value)}
            onBlur={onBlur}
            value={value}
            ref={ref}
            {...props}
          />
        )}
      />
      <Field.ErrorText>{error?.message as string}</Field.ErrorText>
    </Field.Root>
  )
}
