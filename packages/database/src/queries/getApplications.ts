import { entityManager } from "../mysql/connection"
import { Application } from "../entities/application"
import { ApplicationStatus } from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"
import { Course } from "../entities/course"
import { Account } from "../entities/account"

export async function getApplications({
  tutorId,
  lecturerId,
}: { tutorId?: UUID; lecturerId?: UUID } = {}) {
  const query = entityManager
    .createQueryBuilder()
    .select("application")
    .addSelect(
      (subQuery) =>
        subQuery
          .select("COUNT(tutorApplications.id)")
          .from(Application, "tutorApplications")
          .where(`tutorApplications.status = '${ApplicationStatus.ACCEPTED}'`)
          .andWhere("tutorApplications.tutorId = application.tutorId"),
      "frequency"
    )
    .from(Application, "application")
    .leftJoinAndSelect("application.course", "course")
    .leftJoinAndSelect("application.tutor", "tutor")
    .leftJoinAndSelect("tutor.account", "tutorAccount")

  if (tutorId) query.andWhere("application.tutorId = :tutorId", { tutorId })
  if (lecturerId)
    query.innerJoin(
      "course.lecturers",
      "lecturer",
      "lecturer.id = :lecturerId",
      {
        lecturerId,
      }
    )

  const result = await query.getRawAndEntities()

  console.warn(result)

  const maxFrequency = Math.max(
    ...result.raw.map((row) => Number(row.frequency))
  )

  return result.entities.map((course, index) => ({
    ...course,
    frequency: Number(result.raw[index].frequency),
    frequencyPercent: Number(result.raw[index].frequency) / maxFrequency,
  }))
}
