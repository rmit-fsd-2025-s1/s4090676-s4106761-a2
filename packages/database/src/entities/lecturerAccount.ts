import { Entity, JoinColumn, OneToOne } from "typeorm"
import { Account } from "./account"
import { UUIDEntity } from "./entity"

@Entity()
export class LecturerAccount extends UUIDEntity {
  @OneToOne(() => Account, (account) => account.id)
  @JoinColumn()
  account: Account
}
