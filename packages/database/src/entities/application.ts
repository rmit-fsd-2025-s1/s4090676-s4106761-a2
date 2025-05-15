import { UUIDEntity } from "@/entities/entity"
import { Column, Entity, ManyToOne } from "typeorm"
import { Course } from "./courses"

export enum ApplicationType {
  LAB = "LAB ASSISTANT",
  TUTOR = "TUTOR",
}

@Entity()
export class Application extends UUIDEntity {
  @Column({
    type: "enum",
    enum: ApplicationType,
    nullable: false,
  })
  type: "enum"

  //   @Column({
  //     type: "enum",
  //     enum: UserRole,
  //     default: UserRole.GHOST,
  // })
  // role: UserRole

  @ManyToOne(() => Course, (course) => course.id)
  course: Course

  @Column()
  tutorId: string

  @Column()
  status: string

  @Column({ nullable: true })
  comment?: string

  //   @ManyToOne(() => Account, (account) => account.uuid)
}

// export type Application = {
//   id: UUID
//   type: ApplicationType
//   courseId: UUID
//   tutorId: UUID
//   status: ApplicationStatus
//   comment?: string
// }
