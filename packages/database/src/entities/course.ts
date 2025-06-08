import { UUIDEntity } from "./entity"
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm"
import { Application } from "./application"
import { ApplicationType, Semester } from "@repo/types/enums"
import { LecturerAccount } from "./lecturerAccount"

@Entity()
export class Course extends UUIDEntity {
  @Column()
  code: string

  @Column()
  name: string

  @Column({
    type: "enum",
    enum: Semester,
  })
  semester: Semester

  @OneToMany(() => Application, (application) => application.course, {
    onDelete: "CASCADE",
  })
  applications: Application[]

  @ManyToMany(() => LecturerAccount, (acc) => acc.courses)
  lecturers: LecturerAccount[]

  @Column("simple-array")
  availableRoles: ApplicationType[]
}
