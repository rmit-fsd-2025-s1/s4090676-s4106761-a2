import { UUID } from "@repo/types/uuid"
import { Application } from "@repo/database/entities/application"

export type UpdateManyApplications = {
  selectedApplications: UUID[]
  updates: Partial<Application>
}

export type UpdateManyApplicationsRes = Application[]

