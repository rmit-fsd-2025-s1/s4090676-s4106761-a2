import { UUIDEntity } from "./entity"
import { Column, Entity, ManyToOne } from "typeorm"
import { Course } from "./courses"
import { ApplicationType } from "@repo/types/enums"

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
  @IsNotEmpty()
  tutorId: string

  @Column()
  status: string

  @Column()
  comment: string | null

  //   @ManyToOne(() => Account, (account) => account.uuid)
}

function IsNotEmpty(): (target: Application, propertyKey: "tutorId") => void {
  throw new Error("Function not implemented.")
}
// export type Application = {
//   id: UUID
//   type: ApplicationType
//   courseId: UUID
//   tutorId: UUID
//   status: ApplicationStatus
//   comment?: string
// }
