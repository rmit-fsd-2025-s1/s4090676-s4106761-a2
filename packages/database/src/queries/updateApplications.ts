import { entityManager } from "../mysql/connection"
import { Course } from "../entities/course"
import { Application } from "../entities/application"
import { ApplicationStatus } from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"

export async function updateApplications(
  setFields: Partial<Application>,
  applications: UUID[]
) {
  return await entityManager
    .createQueryBuilder()
    .update(Application)
    .set(setFields)
    .where("id IN (:...ids)", { ids: applications })
    .execute()
}
