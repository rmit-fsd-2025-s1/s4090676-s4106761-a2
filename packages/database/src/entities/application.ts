import { UUIDEntity } from "./entity"
import { Column, Entity, ManyToOne } from "typeorm"
import { Course } from "./course"
import { ApplicationType, Semester } from "@repo/types/enums"
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
