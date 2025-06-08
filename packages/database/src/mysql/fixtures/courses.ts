import { ApplicationType, Semester } from "@repo/types/enums"
import { Course } from "../../entities/course"
import { entityManager } from "../connection"

export async function createCourses() {
  await entityManager.save(
    entityManager.create(Course, {
      code: "CS101",
      name: "Computer Science 101",
      semester: Semester.ONE,
      availableRoles: [ApplicationType.LAB, ApplicationType.TUTOR],
    })
  )
}
