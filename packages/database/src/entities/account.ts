import { UUIDEntity } from "./entity"
import { Check, Column, Entity, Unique } from "typeorm"
import { AccountType } from "@repo/types/enums"

@Entity()
@Unique(["email"])
@Check(`LEN("password") > 1`)
@Check(`LEN("name") > 1`)
@Check(
  `\`email\` REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_\`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\\\.[a-zA-Z]{2,63}$"`
)
export class Account extends UUIDEntity {
  @Column()
  name: string

  @Column()
  password: string

  @Column()
  email: string

  @Column({
    type: "enum",
    enum: AccountType,
  })
  type: AccountType
}
