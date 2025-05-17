import { Entity } from "typeorm"
import { Account } from "./account"
import { AccountType } from "@repo/types/enums"

@Entity()
export class LecturerAccount extends Account {
  declare type: AccountType.LECTURER
}
