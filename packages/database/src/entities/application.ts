import { UUIDEntity } from "./entity"
import { Column, Entity, ManyToOne } from "typeorm"
import type { Relation } from "typeorm"
import { Course } from "./course"
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

  @ManyToOne(() => TutorAccount, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  tutor: Relation<TutorAccount>

  @Column()
  status: string

  @Column()
  comment: string
}
