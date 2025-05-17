import { UUIDEntity } from "./entity"
import { Check, Column, Entity, Unique } from "typeorm"
import { AccountType } from "@repo/types/enums"

@Unique(["email"])
@Check(`LEN("password") > 1`)
@Check(`LEN("name") > 1`)
@Check(
  `\`email\` REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_\`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\\\.[a-zA-Z]{2,63}$"`
)
export abstract class Account extends UUIDEntity {
  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar" })
  password: string

  @Column({ type: "varchar" })
  email: string

  @Column({
    type: "enum",
    enum: AccountType,
  })
  type: AccountType
}
