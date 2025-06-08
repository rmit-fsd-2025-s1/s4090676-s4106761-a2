import { UUIDEntity } from "./entity"
import { Column, Entity, ManyToOne } from "typeorm"
import type { Relation } from "typeorm"
import { Course } from "./course"
import { ApplicationStatus, ApplicationType } from "@repo/types/enums"
import { TutorAccount } from "./tutorAccount"

@Entity()
export class Application extends UUIDEntity {
  @Column({
    type: "enum",
    enum: ApplicationType,
    nullable: false,
  })
  type: ApplicationType

  @ManyToOne(() => Course, (course) => course.applications, {
    eager: true,
  })
  course: Course

  @ManyToOne(() => TutorAccount, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  tutor: Relation<TutorAccount>

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    nullable: false,
  })
  status: ApplicationStatus

  @Column()
  comment: string
}
