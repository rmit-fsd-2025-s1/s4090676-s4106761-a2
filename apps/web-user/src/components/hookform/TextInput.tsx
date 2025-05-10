import { Field, Input } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import { ComponentProps } from "react"

export function TextInput ({ name, hideLabel, ...props }: {
  name: string,
  hideLabel?: boolean
} & ComponentProps<typeof Input>) {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve those props

  const error = errors[name]

  return (
    <Field.Root invalid={!!error}>
      {!hideLabel && <Field.Label>{name}</Field.Label>}
      <Input {...register(name)} {...props} />
      <Field.ErrorText>{error?.message as string}</Field.ErrorText>
    </Field.Root>
  )
}
