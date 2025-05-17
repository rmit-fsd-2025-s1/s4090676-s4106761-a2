import { AppDataSource } from "./mysql/connection"
import { LecturerAccount } from "./entities/lecturerAccount"
import { TutorAccount } from "./entities/tutorAccount"

const entities = [LecturerAccount, TutorAccount]

export { AppDataSource, entities }
