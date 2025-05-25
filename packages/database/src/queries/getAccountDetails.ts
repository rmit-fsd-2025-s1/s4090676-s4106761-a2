import { AccountDetails } from "../types/AccountDetails"
import { entityManager } from "../mysql/connection"
import { LecturerAccount } from "../entities/lecturerAccount"
import { TutorAccount } from "../entities/tutorAccount"
import { Account } from "../entities/account"

/**
 * Given an Account get its details
 * and strip the password
 */
export async function getAccountDetails(user: Account) {
  const {
    account: { password, ...accountDetails },
    ...userDetails
  } = await entityManager.findOneByOrFail<LecturerAccount | TutorAccount>(
    user.type === "TUTOR" ? TutorAccount : LecturerAccount,
    {
      account: user,
    }
  )

  return {
    ...userDetails,
    account: accountDetails,
  } as AccountDetails
}
