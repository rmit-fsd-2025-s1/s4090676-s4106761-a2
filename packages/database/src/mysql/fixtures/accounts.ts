import { AccountType, Availability } from "@repo/types/enums"
import { entityManager } from "../connection"
import { Account } from "../../entities/account"
import { LecturerAccount } from "../../entities/lecturerAccount"
import { TutorAccount } from "../../entities/tutorAccount"

export async function createAccounts() {
  const lec1acc = entityManager.create(Account, {
    name: "Julia",
    password: "password111",
    email: "julia@example.com",
    type: AccountType.LECTURER,
  })

  const tut1acc = entityManager.create(Account, {
    name: "Julian",
    password: "password111",
    email: "julian@example.com",
    type: AccountType.TUTOR,
  })

  await entityManager.save([lec1acc, tut1acc])

  const tut1 = entityManager.create(TutorAccount, {
    account: tut1acc,
    availability: Availability.FULLTIME,
    skills: ["Dancing"],
    credentials: "Attended RMIT University",
  })
  const lec1 = entityManager.create(LecturerAccount, {
    account: lec1acc,
  })

  await entityManager.save([lec1, tut1])
}
