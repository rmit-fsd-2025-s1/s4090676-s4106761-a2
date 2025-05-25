import { TutorAccount } from "../entities/tutorAccount"
import { LecturerAccount } from "../entities/lecturerAccount"
import { Account } from "../entities/account"

export type AccountDetails =
  | Omit<LecturerAccount & Account, "password" | "account">
  | Omit<TutorAccount & Account, "password" | "account">
