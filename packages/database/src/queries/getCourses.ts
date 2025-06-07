import { entityManager } from "../mysql/connection"
import { Course } from "../entities/course"

export async function getCourses() {
  const result = await entityManager
    .createQueryBuilder()
    .select("course")
    .addSelect("COALESCE(SUM(applications.id), 0)", "frequency")
    .from(Course, "course")
    .leftJoin("course.applications", "applications")
    .groupBy("course.id")
    .getRawAndEntities()

  return result.entities.map((course, index) => ({
    ...course,
    frequency: Number(result.raw[index].frequency),
  }))
}
