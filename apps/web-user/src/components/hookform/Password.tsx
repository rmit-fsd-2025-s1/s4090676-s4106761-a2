import { Field, Input } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { ComponentProps } from "react"
import { useFormContext } from "react-hook-form"

export function Password({
  name,
  ...props
}: { name: string } & ComponentProps<typeof Input>) {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve those props

  const error = errors[name]

  return (
    <Field.Root invalid={!!error}>
      <Field.Label>{name}</Field.Label>
      <PasswordInput {...register(name)} {...props} />
      <Field.ErrorText>{error?.message as string}</Field.ErrorText>
    </Field.Root>
  )
}
