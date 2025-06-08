import { ApplicationStatus, ApplicationType } from "@repo/types/enums"
import { Course } from "../../entities/course"
import { entityManager } from "../connection"
import { Application } from "../../entities/application"
import { TutorAccount } from "../../entities/tutorAccount"

export async function createApplications() {
  await entityManager.save(
    entityManager.create(Application, {
      type: ApplicationType.TUTOR,
      course: await entityManager.findOneByOrFail(Course, { code: "CS101" }),
      tutor: await entityManager.findOneByOrFail(TutorAccount, {
        credentials: "Attended RMIT University",
      }),
      status: ApplicationStatus.ACCEPTED,
      comment: "Great application!",
    })
  )
}
