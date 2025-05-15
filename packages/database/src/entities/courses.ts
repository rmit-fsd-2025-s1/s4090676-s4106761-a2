import { UUIDEntity } from "@/entities/entity"
import { Column, Entity, OneToMany } from "typeorm"
import { Application } from "./application"

@Entity()
export class Course extends UUIDEntity {
  @Column()
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
