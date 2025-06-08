import { entityManager } from "../mysql/connection"
import { Application } from "../entities/application"
import { ApplicationStatus } from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"

export async function getApplications({
  tutorId,
  lecturerId,
  searchParam,
}: {
  tutorId?: UUID
  lecturerId?: UUID
  searchParam?: string | undefined
} = {}) {
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

  if (searchParam)
    query
      .andWhere("tutorAccount.name LIKE CONCAT('%',:search, '%')", {
        search: searchParam,
      })
      .orWhere("course.code LIKE CONCAT('%',:search, '%')")
      .orWhere("course.name LIKE CONCAT('%',:search, '%')")
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
