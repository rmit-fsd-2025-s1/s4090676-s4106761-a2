import { Semester } from "@repo/types/enums"
import { Course } from "../../entities/courses"
import { entityManager } from "../connection"

export function createCourses() {
  entityManager.save(
    entityManager.create(Course, {
      code: "CS101",
      name: "Computer Science 101",
      semester: Semester.ONE,
    })
  )
}

//   @Column()
//   code: string

//   @Column()
//   name: string

//   @Column()
//   semester: Semester

//   @OneToMany(() => Application, (application) => application.id)
//   applications: Application[]
