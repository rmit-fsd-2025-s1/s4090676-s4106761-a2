import { z } from "zod"
import {
  AccountType,
  ApplicationStatus,
  ApplicationType,
} from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"

export const patchApplicationsSchema = z
  .object({
    selectedApplications: z.array(z.string().uuid()),
    updates: z.object({
      comment: z.string(),
      status: z.nativeEnum(ApplicationStatus),
    }),
  })
  .required()
