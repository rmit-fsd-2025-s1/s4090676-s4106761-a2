import { entityManager } from "../mysql/connection"
import { Application } from "../entities/application"
import { ApplicationStatus } from "@repo/types/enums"
import { UUID } from "@repo/types/uuid"

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
          .select("COUNT(groupedApplication.id)")
          .from(Application, "groupedApplication")
          .groupBy("groupedApplication.tutor")
          .where(`groupedApplication.status = '${ApplicationStatus.ACCEPTED}'`),
      "frequency"
    )
    .from(Application, "application")

  if (tutorId) query.where("application.tutorId = :tutorId", { tutorId })
  if (lecturerId)
    query
      .innerJoin("application.course", "course")
      .innerJoin("course.lecturers", "lecturer", "lecturer.id = :lecturerId", {
        lecturerId,
      })

  const result = await query.getRawAndEntities()

  const maxFrequency = Math.max(
    ...result.raw.map((row) => Number(row.frequency))
  )

  return result.entities.map((course, index) => ({
    ...course,
    frequency: Number(result.raw[index].frequency),
    frequencyPercent: Number(result.raw[index].frequency) / maxFrequency,
  }))
}
