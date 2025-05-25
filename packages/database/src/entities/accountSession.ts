import { Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Account } from "./account"

@Entity()
export class AccountSession {
  @PrimaryColumn()
  token: string

  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  account: Account
}
