import { z } from "zod"
import { AccountType, Availability } from "@repo/types/enums"

export const accountSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string().email(),
  type: z.enum([AccountType.TUTOR, AccountType.LECTURER]),
})

export const tutorSchema = z.object({
  account: accountSchema,
  availability: z.enum([Availability.FULLTIME, Availability.PARTTIME]),
  skills: z.array(z.string()),
  credentials: z.string(),
})

export const lecturerSchema = z.object({
  account: accountSchema,
})
