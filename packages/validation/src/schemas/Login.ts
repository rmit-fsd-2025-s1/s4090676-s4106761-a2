import { z } from "zod"
import { AccountType } from "@repo/types/enums"

export const loginSchema = z
  .object({
    type: z.enum([AccountType.TUTOR, AccountType.LECTURER]),
    Email: z.string().email("Please enter a valid email"),
    Password: z
      .string()
      .min(8, "Please enter a password of at least 8 characters"),
  })
  .required()

export type LoginSchemaType = z.infer<typeof loginSchema>
