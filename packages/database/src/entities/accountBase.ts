import { UUIDEntity } from "./entity"
import { Check, Column, ManyToOne, OneToMany, Unique } from "typeorm"
import { AccountType } from "@repo/types/enums"
import { AuthSession } from "./authSession"

@Unique(["email"])
@Check(`LEN("password") > 1`)
@Check(`LEN("name") > 1`)
@Check(
  `\`email\` REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_\`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\\\.[a-zA-Z]{2,63}$"`
)
export abstract class AccountBase extends UUIDEntity {
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
