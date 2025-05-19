import express from "express"

export const protectedRoutes = express.Router()

protectedRoutes.use((req, res, next) => {
  /* TODO: check for auth cookie, if user is valid and add user details to item */
  next()
})
