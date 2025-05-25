import { TutorAccount } from "../entities/tutorAccount"
import { LecturerAccount } from "../entities/lecturerAccount"
import { OmitDeep } from "@repo/types/util"

export type AccountDetails =
  | OmitDeep<LecturerAccount, "password">
  | OmitDeep<TutorAccount, "password">
