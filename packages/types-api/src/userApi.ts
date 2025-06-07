import { UUID } from "@repo/types/uuid"
import { Application } from "@repo/database/entities/application"
import { ApplicationType } from "@repo/types/enums"
import { Course } from "@repo/database/entities/course"

export type UpdateApplications = {
  selectedApplications: UUID[]
  updates: Partial<Application>
}

export type UpdateApplicationsRes = Application[]

export type ApplicationsRes = (Application & {
  frequency: number
  frequencyPercent: number
})[]

export type CoursesRes = (Course & {
  frequency: number
})[]

export type ApplicationReq = {
  type: ApplicationType
  course: UUID
}
