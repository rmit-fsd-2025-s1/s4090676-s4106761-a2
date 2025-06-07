import { UUIDEntity } from "./entity"
import { Column, Entity, OneToMany } from "typeorm"
import { Application } from "./application"
import { ApplicationType, Semester } from "@repo/types/enums"

@Entity()
export class Course extends UUIDEntity {
  // TODO: Why do courses have a type?
  @Column()
  code: string

  @Column()
  name: string

  @Column()
  semester: Semester

  @OneToMany(() => Application, (application) => application.course, {
    onDelete: "CASCADE",
  })
  applications: Application[]

  @Column("simple-array")
  availableRoles: ApplicationType[]
}
