import { UUIDEntity } from "./entity"
import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { LecturerAccount } from "./lecturerAccount"
import { TutorAccount } from "./tutorAccount"

@Entity()
export class AuthSession extends UUIDEntity {
  @Column()
  token: string

  @ManyToOne(() => LecturerAccount, (account) => account.id)
  lecturerAccount: LecturerAccount[]

  @ManyToOne(() => TutorAccount, (account) => account.id)
  tutorAccount: TutorAccount[]
}
