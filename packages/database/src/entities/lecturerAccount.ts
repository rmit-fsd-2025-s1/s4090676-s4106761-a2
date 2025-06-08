import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  Relation,
} from "typeorm"
import { Account } from "./account"
import { UUIDEntity } from "./entity"
import { Course } from "./course"

@Entity()
export class LecturerAccount extends UUIDEntity {
  @OneToOne(() => Account, (account) => account.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  account: Account

  @ManyToMany(() => Course, (course) => course.lecturers)
  @JoinTable()
  courses: Relation<Course>[]
}
