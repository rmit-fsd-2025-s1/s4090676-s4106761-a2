import { UUIDEntity } from "./entity"
import { Column, Entity, ManyToOne } from "typeorm"
import { Course } from "./courses"
import { ApplicationType } from "@repo/types/enums"
import { TutorAccount } from "./tutorAccount"

@Entity()
export class Application extends UUIDEntity {
  @Column({
    type: "enum",
    enum: ApplicationType,
    nullable: false,
  })
  type: ApplicationType

  @ManyToOne(() => Course, (course) => course.applications)
  course: Course

  @ManyToOne(() => TutorAccount, (tutor) => tutor.id, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  tutor: TutorAccount

  @Column()
  status: string

  @Column()
  comment: string
}

//FIXME
// @Column()
// tutorId: string

// @Column()
// status: string

// @Column()
// comment: string

//   @ManyToOne(() => Account, (account) => account.uuid)

// function IsNotEmpty(): (target: Application, propertyKey: "tutorId") => void {
//   throw new Error("Function not implemented.")
// }
// export type Application = {
//   id: UUID
//   type: ApplicationType
//   courseId: UUID
//   tutorId: UUID
//   status: ApplicationStatus
//   comment?: string
// }

//   @Column({
//     type: "enum",
//     enum: UserRole,
//     default: UserRole.GHOST,
// })
// role: UserRole
