import { Router } from "express"
import { entityManager } from "@repo/database/datasource"
import { Account } from "@repo/database/entities/account"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { AccountType } from "@repo/types/enums"
import { accountSchema } from "@repo/validation/UpdateUser"

const router = Router()

router.post("/signup-tutor", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body

    const record = {
      name: Name,
      email: Email,
      password: Password,
      type: AccountType.TUTOR,
    }

    // validate the input
    accountSchema.parse(record)

    const account = entityManager.create(Account, record)
    await entityManager.save(account)

    const tutor = entityManager.create(TutorAccount, { account })
    await entityManager.save(tutor)

    res.status(201).json({ message: "Tutor account created successfully" })
  } catch (error) {
    console.error("Error in signup-tutor:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export default router
