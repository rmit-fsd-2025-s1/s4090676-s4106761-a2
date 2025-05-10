import {
  AccountType,
  ApplicationStatus,
  ApplicationType,
  Availability,
  Semester,
} from "@/context/localstorage/enums"

export type UUID = string

export interface Account {
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
  credentials?: string[]
}

export interface LecturerAccount extends Account {
  type: AccountType.LECTURER
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
  tutorAccounts: TutorAccount[]
  lecturerAccounts: LecturerAccount[]
  authenticatedUser: AuthenticatedUser | null
  applications: Application[]
  courses: Course[]
  versionSlug: string
}
