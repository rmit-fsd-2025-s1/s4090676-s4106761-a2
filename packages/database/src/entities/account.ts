import { UUIDEntity } from "@/entities/entity"
import { Column, Entity } from "typeorm"

@Entity()
export class Account extends UUIDEntity {
  @Column()
  name: string
}
