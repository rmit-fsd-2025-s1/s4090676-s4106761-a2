import { Entity, ManyToOne } from "typeorm"
import { AccountBase } from "./accountBase"
import { AccountType } from "@repo/types/enums"

@Entity()
export class LecturerAccount extends AccountBase {
  declare type: AccountType.LECTURER
}
