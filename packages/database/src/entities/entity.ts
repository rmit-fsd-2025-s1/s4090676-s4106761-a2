import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UUIDEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string
}
