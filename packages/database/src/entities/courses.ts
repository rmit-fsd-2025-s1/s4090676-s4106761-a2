import { UUIDEntity } from "./entity"
import { Column, Entity, OneToMany } from "typeorm"
import { Application } from "./application"

@Entity()
export class Course extends UUIDEntity {
  // TODO: Why do courses have a type?
  @Column({ type: "varchar" })
  type: string

  @OneToMany(() => Application, (application) => application.id)
  applications: Application[]
}

// export type Application = {
//   id: UUID
//   type: ApplicationType
//   courseId: UUID
//   tutorId: UUID
//   status: ApplicationStatus
//   comment?: string
// }
