// noinspection JSUnusedLocalSymbols
import express from "express"
import { entityManager } from "@repo/database/datasource"
import { Course } from "@repo/database/entities/course"
import { getCourses } from "@repo/database/queries/getCourses"
import { CoursesRes } from "@repo/types-api/userApi"

export const courseRoutes = express.Router()

courseRoutes.get("/all", async (req, res) => {
  res.json((await getCourses()) satisfies CoursesRes)
})

courseRoutes.get("/:courseId", async (req, res) => {
  res.json(
    (await entityManager.findOneByOrFail(Course, {
      id: req.params.courseId,
    })) satisfies Course
  )
})
