import { Router } from "express"
import { entityManager } from "@repo/database/datasource"
import { Account } from "@repo/database/entities/account"
import { LecturerAccount } from "@repo/database/entities/lecturerAccount"
import { AccountType } from "@repo/types/enums"

const router = Router()

router.post("/signup-lecturer", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body

    const account = entityManager.create(Account, {
      name: Name,
      email: Email,
      password: Password,
      type: AccountType.LECTURER,
    })

    await entityManager.save(account)

    const lecturer = entityManager.create(LecturerAccount, { account })
    await entityManager.save(lecturer)

    res.status(201).json({ message: "Lecturer account created successfully" })
  } catch (err) {
    console.error("Error in /signup-lecturer:", err)
    res.status(500).json({ message: "Signup failed" })
  }
})

export const signupLecturerRouter = router
