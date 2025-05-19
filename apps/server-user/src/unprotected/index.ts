import express from "express"
import { authRoutes } from "@/unprotected/auth"

export const unprotectedRoutes = express.Router()

unprotectedRoutes.use(authRoutes)
