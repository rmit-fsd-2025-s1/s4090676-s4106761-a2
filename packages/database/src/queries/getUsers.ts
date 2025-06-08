// noinspection SqlNoDataSourceInspection

import { entityManager } from "../mysql/connection"
import { ApplicationStatus } from "@repo/types/enums"
import { TutorStatsRes } from "@repo/types/tutorStats"

export async function getTutorStats() {
  return (await entityManager.query(
    `
    SELECT
      acc.name as name,
      SUM(CASE WHEN a.status = ? THEN 1 ELSE 0 END) as accepted,
      SUM(CASE WHEN a.status = ? THEN 1 ELSE 0 END) as rejected,
      SUM(CASE WHEN a.status = ? THEN 1 ELSE 0 END) as pending
    FROM tutor_account t
    LEFT JOIN application a ON t.id = a.tutorId
    LEFT JOIN account acc ON t.accountId = acc.id
    GROUP BY t.id
  `,
    [
      ApplicationStatus.ACCEPTED,
      ApplicationStatus.REJECTED,
      ApplicationStatus.PENDING,
    ]
  )) as TutorStatsRes
}

// Anthropic (2024). Claude [Large language model], accessed 8 June 2025. https://github.com/copilot. See below for the prompt and output
// why doesn't this work? what's the most efficent way to do this?
//   [
//     {
//       "tutorId": "5096fccf-5093-440d-9a61-8db296b27a71",
//       "tutor_availability": "FULLTIME",
//       "tutor_skills": "Dancing",
//       "tutor_credentials": "Attended RMIT University",
//       "tutor_accountId": "3fb53857-4aa1-4c83-adbd-1e36ff8519f4",
//       "accepted": "0",
//       "rejected": "0",
//       "pending": "0"
//     },
//     {
//       "tutorId": "c9458a39-b230-45ae-b35b-b0acc64fba22",
//       "tutor_availability": null,
//       "tutor_skills": null,
//       "tutor_credentials": null,
//       "tutor_accountId": "cf0a12a8-8bf2-4e09-a6b1-b1e0c0093dd8",
//       "accepted": "0",
//       "rejected": "0",
//       "pending": "0"
//     }
//   ]
// import { entityManager } from "../mysql/connection"
// import { Application } from "../entities/application"
// import { ApplicationStatus } from "@repo/types/enums"
// import { SelectQueryBuilder } from "typeorm"
//
// const getNumberOfType = (sq: SelectQueryBuilder<any>) =>
//   sq
//     .select("COUNT(*)")
//     .from(Application, "tutorApplications")
//     .where(`tutorApplications.status = :status`)
//     .andWhere("tutorApplications.tutorId = application.tutorId")
//
// export async function getTutorStats() {
//   const result = await entityManager
//     .createQueryBuilder()
//     .select("tutor.id", "tutorId")
//     .addSelect(
//       (subQuery) =>
//         getNumberOfType(subQuery).setParameter(
//           "status",
//           ApplicationStatus.ACCEPTED
//         ),
//       "accepted"
//     )
//     .addSelect(
//       (subQuery) =>
//         getNumberOfType(subQuery).setParameter(
//           "status",
//           ApplicationStatus.REJECTED
//         ),
//       "rejected"
//     )
//     .addSelect(
//       (subQuery) =>
//         getNumberOfType(subQuery).setParameter(
//           "status",
//           ApplicationStatus.PENDING
//         ),
//       "pending"
//     )
//     .from(Application, "application")
//     .leftJoinAndSelect("application.tutor", "tutor")
//     .getRawMany()
//
//   console.log(result)
//
//   return result
// }
// Copilot said: The issue is that you're mixing `getRawMany()`
// The issue is that you're mixing getRawMany() with leftJoinAndSelect, and your subqueries are using parameters that get overwritten by each other. Here are the two most efficient approaches:
//
// Option 1: Raw SQL with Case Statements (Most Efficient)
//
// getTutorStats.ts
// v3
// import { entityManager } from "../mysql/connection"
// import { ApplicationStatus } from "@repo/types/enums"
//
// export async function getTutorStats() {
//   const result = await entityManager.query(`
//     SELECT
// Option 2: Fixed TypeORM Query Builder
//
// getTutorStats.ts
// v4
// import { entityManager } from "../mysql/connection"
// import { Application } from "../entities/application"
// import { TutorAccount } from "../entities/tutorAccount"
// import { ApplicationStatus } from "@repo/types/enums"
//
// export async function getTutorStats() {
// Option 3: If you don't have the reverse relation
//
// getTutorStats.ts
// v5
// import { entityManager } from "../mysql/connection"
// import { Application } from "../entities/application"
// import { TutorAccount } from "../entities/tutorAccount"
// import { ApplicationStatus } from "@repo/types/enums"
//
// export async function getTutorStats() {
// Why your original didn't work:
//
// Parameter conflicts: Each setParameter("status", ...) overwrote the previous one
// Wrong base entity: You were selecting from Application but wanted stats per TutorAccount
// Missing GROUP BY: Without grouping, you get one row per application, not per tutor
// Mixed approaches: Using leftJoinAndSelect with getRawMany() doesn't work as expected
// Most efficient: Option 1 (raw SQL) is fastest, but Option 2/3 are more maintainable if you prefer staying within TypeORM.
