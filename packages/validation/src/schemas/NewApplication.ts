import { z } from "zod"
import { AccountType, ApplicationType } from "@repo/types/enums"

export const newApplicationSchema = z
  .object({
    type: z.nativeEnum(ApplicationType),
    course: z.string().uuid(),
  })
  .required()
