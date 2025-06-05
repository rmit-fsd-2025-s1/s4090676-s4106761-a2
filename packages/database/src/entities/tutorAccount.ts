import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Account } from "./account"
import { Availability } from "@repo/types/enums"
import { UUIDEntity } from "./entity"
import { Application } from "./application"

@Entity()
export class TutorAccount extends UUIDEntity {
  @OneToOne(() => Account, (a) => a.id, { onDelete: "CASCADE", eager: true })
  @JoinColumn()
  account: Account

  @Column({
    type: "enum",
    enum: Availability,
  })
  availability: Availability

  @Column("simple-array")
  skills: string[]

  @Column()
  credentials: string
  @OneToMany(() => Application, (app) => app.tutor)
  applications: Application[]
}
