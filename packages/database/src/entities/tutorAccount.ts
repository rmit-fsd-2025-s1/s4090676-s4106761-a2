import { Column, Entity, ManyToOne } from "typeorm"
import { AccountBase } from "./accountBase"
import { AccountType, Availability } from "@repo/types/enums"
import { AuthSession } from "./authSession"

@Entity()
export class TutorAccount extends AccountBase {
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
