import { UUIDEntity } from "./entity"
import { Column, Entity, OneToMany } from "typeorm"
import { Application } from "./application"
import { Semester } from "@repo/types/enums"

@Entity()
export class Course extends UUIDEntity {
  // TODO: Why do courses have a type?
  @Column()
  code: string

  @Column()
  name: string

  @Column()
  semester: Semester

  @OneToMany(() => Application, (application) => application.id, {
    onDelete: "CASCADE",
  })
  applications: Application[]
}

// export type Course = {
//   id: UUID
//   code: string
//   name: string
//   availableRoles: ApplicationType[]
//   semester: Semester
// }

// export type Application = {
//   id: UUID
//   type: ApplicationType
//   courseId: UUID
//   tutorId: UUID
//   status: ApplicationStatus
//   comment?: string
// }
