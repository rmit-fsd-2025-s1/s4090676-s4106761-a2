// noinspection JSUnusedLocalSymbols
import express from "express"
import { loginRouter } from "@/unprotected/auth/login"

export const authRoutes = express.Router()

/* load routes */
authRoutes.use("/login", loginRouter)
