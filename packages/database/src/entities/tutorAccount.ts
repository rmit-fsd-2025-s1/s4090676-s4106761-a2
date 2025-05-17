import { Column, Entity } from "typeorm"
import { Account } from "./account"
import { AccountType, Availability } from "@repo/types/enums"

@Entity()
export class TutorAccount extends Account {
  declare type: AccountType.TUTOR

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
