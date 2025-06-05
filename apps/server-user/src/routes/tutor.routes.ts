import { Router } from "express"
import { entityManager } from "@repo/database/datasource"
import { TutorAccount } from "@repo/database/entities/tutorAccount"

const router = Router()

router.get("/:id", async (req, res) => {
  const tutorId = String(req.params.id)

  try {
    const tutor = await entityManager.findOneOrFail(TutorAccount, {
      where: { id: tutorId },
      relations: ["account"],
    })

    res.json(tutor)
  } catch (error) {
    console.error("Error fetching tutor:", error)
    res.status(404).json({ error: "Tutor not found" })
  }
})

export const tutorRouter = router
