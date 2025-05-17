import { PrimaryGeneratedColumn } from "typeorm"

export abstract class UUIDEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string
}
