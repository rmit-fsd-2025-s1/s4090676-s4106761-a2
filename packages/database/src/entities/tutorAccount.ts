import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { Account } from "./account"
import { Availability } from "@repo/types/enums"
import { UUIDEntity } from "./entity"

@Entity()
export class TutorAccount extends UUIDEntity {
  @OneToOne(() => Account, (a) => a.id, { onDelete: "CASCADE", eager: true })
  @JoinColumn()
  account: Account

  @Column({
    type: "enum",
    enum: Availability,
    nullable: true,
  })
  availability?: Availability

  @Column("simple-array", { nullable: true })
  skills?: string[]

  @Column({ nullable: true })
  credentials?: string
}
