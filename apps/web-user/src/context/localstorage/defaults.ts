import {
  Application,
  AuthenticatedUser,
  Course,
  LecturerAccount,
  LocalstorageSchema,
  TutorAccount,
} from "@/context/localstorage/types";
import {
  AccountType,
  ApplicationStatus,
  ApplicationType,
  Availability,
  Semester,
} from "@/context/localstorage/enums";

const DEFAULT_TUTORS: TutorAccount[] = [
  {
    id: "TUTOR-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    type: AccountType.TUTOR,
    availability: Availability.FULLTIME,
    skills: ["Knitting", "Singing"],
    credentials: ["COSC2801"],
  },
  {
    id: "TUTOR-2",
    name: "Jane Bo",
    email: "jane@example.com",
    password: "password456",
    type: AccountType.TUTOR,
  },
  {
    id: "TUTOR-3",
    name: "Josh Dillan",
    email: "josh@example.com",
    password: "password123",
    type: AccountType.TUTOR,
  },
  {
    id: "TUTOR-4",
    name: "Ye Jackson",
    email: "ye@example.com",
    password: "password456",
    type: AccountType.TUTOR,
  },
];

const DEFAULT_LECTURERS: LecturerAccount[] = [
  {
    id: "LEC-1",
    name: "Jill Coltrane",
    email: "jill@example.com",
    password: "password123",
    type: AccountType.LECTURER,
  },
  {
    id: "LEC-2",
    name: "Jacob Kennett",
    email: "jacob@example.com",
    password: "password456",
    type: AccountType.LECTURER,
  },
];

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: "APP-1",
    courseId: "COURSE-1",
    tutorId: "TUTOR-1",
    comment: "A possible candidate",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.TUTOR,
  },
  {
    id: "APP-2",
    courseId: "COURSE-2",
    tutorId: "TUTOR-1",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.LAB,
  },
  {
    id: "APP-3",
    courseId: "COURSE-3",
    tutorId: "TUTOR-1",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.TUTOR,
  },
  {
    id: "APP-4",
    courseId: "COURSE-4",
    tutorId: "TUTOR-1",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.LAB,
  },
  {
    id: "APP-5",
    courseId: "COURSE-2",
    tutorId: "TUTOR-2",
    comment: "You will be doing Thursdays",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.TUTOR,
  },
  {
    id: "APP-6",
    courseId: "COURSE-3",
    tutorId: "TUTOR-2",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.LAB,
  },
  {
    id: "APP-7",
    courseId: "COURSE-1",
    tutorId: "TUTOR-3",
    status: ApplicationStatus.REJECTED,
    type: ApplicationType.TUTOR,
  },
  {
    id: "APP-8",
    courseId: "COURSE-4",
    tutorId: "TUTOR-4",
    status: ApplicationStatus.ACCEPTED,
    type: ApplicationType.LAB,
  },
];

const DEFAULT_COURSES: Course[] = [
  {
    id: "COURSE-1",
    code: "COSC2801",
    name: "Java Programming Bootcamp",
    semester: Semester.ONE,
    availableRoles: [ApplicationType.LAB],
  },
  {
    id: "COURSE-2",
    code: "COSC2803",
    name: "Java Programming Studio",
    semester: Semester.SUMMER,
    availableRoles: [ApplicationType.LAB, ApplicationType.TUTOR],
  },
  {
    id: "COURSE-3",
    code: "COSC2802",
    name: "C++ Programming Bootcamp",
    semester: Semester.ONE,
    availableRoles: [ApplicationType.LAB],
  },
  {
    id: "COURSE-4",
    code: "COSC2804",
    name: "C++ Programming Studio",
    semester: Semester.TWO,
    availableRoles: [ApplicationType.LAB, ApplicationType.TUTOR],
  },
];

const DEFAULTS: LocalstorageSchema = {
  tutorAccounts: DEFAULT_TUTORS,
  lecturerAccounts: DEFAULT_LECTURERS,
  authenticatedUser: null,
  applications: DEFAULT_APPLICATIONS,
  courses: DEFAULT_COURSES,
  versionSlug: process.env.NEXT_PUBLIC_VERSION_SLUG ?? "0.0.0",
};

export function setUpLocalstorage(
  testing: boolean | undefined,
): LocalstorageSchema {
  // clone defaults
  const schemaItems: LocalstorageSchema = { ...DEFAULTS };

  const shouldCacheBust =
    process.env.NEXT_PUBLIC_VERSION_SLUG !==
    JSON.parse(localStorage.getItem("versionSlug") ?? "null");

  // replace defaults with existing values
  for (const [schemaKey, defaultValue] of Object.entries(schemaItems)) {
    const existingValue = shouldCacheBust
      ? null
      : localStorage.getItem(schemaKey);
    if (existingValue) {
      Object.assign(schemaItems, { [schemaKey]: JSON.parse(existingValue) });
    } else {
      localStorage.setItem(schemaKey, JSON.stringify(defaultValue));
    }
  }

  if (testing)
    localStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        id: "LEC-1",
        type: AccountType.LECTURER,
      } satisfies AuthenticatedUser),
    );

  // return state of local storage
  return schemaItems as LocalstorageSchema;
}
