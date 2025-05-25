import {
  AccountType,
  ApplicationStatus,
  ApplicationType,
  Availability,
  Semester,
} from "@/context/localstorage/enums"
import { AccountDetails } from "@repo/database/types/AccountDetails"

export type UUID = string

interface Account {
  id: UUID
  type: AccountType
  email: string
  password: string
  name: string
}

export interface TutorAccount extends Account {
  type: AccountType.TUTOR
  availability?: Availability
  skills?: string[]
  credentials?: string
}

export interface LecturerAccount extends Account {
  type: AccountType.LECTURER
  courseIds?: string[]
}

export type AuthenticatedUser = {
  id: UUID
  type: AccountType
}

export type Course = {
  id: UUID
  code: string
  name: string
  availableRoles: ApplicationType[]
  semester: Semester
}

export type Application = {
  id: UUID
  type: ApplicationType
  courseId: UUID
  tutorId: UUID
  status: ApplicationStatus
  comment?: string
}

export type LocalstorageSchema = {
  // liam
  tutorAccounts: TutorAccount[]
  // liam
  lecturerAccounts: LecturerAccount[]
  // ignore
  authenticatedUser: AccountDetails | null
  // aaron
  applications: Application[]
  // aaron
  courses: Course[]
  // ignore
  versionSlug: string

  userId: string | undefined
}
