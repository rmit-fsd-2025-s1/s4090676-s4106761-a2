import { UUID } from "@repo/types/uuid"
import { Application } from "@repo/database/entities/application"
import { ApplicationStatus, ApplicationType } from "@repo/types/enums"
import { Course } from "@repo/database/entities/course"

export type UpdateApplicationsReq = {
  selectedApplications: UUID[]
  updates: {
    status?: ApplicationStatus
    comment?: string
  }
}

export type UpdateApplicationsRes = {}

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
