import { TutorAccount } from "../entities/tutorAccount"
import { LecturerAccount } from "../entities/lecturerAccount"

export type Account = LecturerAccount | TutorAccount

export type AccountDetails =
  | Omit<LecturerAccount, "password">
  | Omit<TutorAccount, "password">
