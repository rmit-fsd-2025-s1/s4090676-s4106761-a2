import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { Account } from "./account"
import { Availability } from "@repo/types/enums"
import { UUIDEntity } from "./entity"

@Entity()
export class TutorAccount extends UUIDEntity {
  @OneToOne(() => Account, (a) => a.id)
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
}
