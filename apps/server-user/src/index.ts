import express, { ErrorRequestHandler } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { appDataSource } from "@repo/database/datasource"
import { protectedRoutes } from "@/protected"
import { unprotectedRoutes } from "@/unprotected"
import { createCourses } from "@repo/database/fixtures/courses"

const app = express()
const LOGGING = true
const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json())

app.use(cookieParser())

app.use((req, res, next) => {
  if (LOGGING) {
    console.log("Request made: ", req.body)
    console.log("Headers w/ request: ", req.headers)
    console.log("Cookies w/ request: ", req.cookies)
  }
  next()
})

app.use(unprotectedRoutes)

app.use(protectedRoutes)

// err should usually be an AggregateError if the error comes from any of the routers
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err?.errors)
  if (res.statusCode !== 200) res.status(500)
  res.json({ message: err?.message })
}

app.use(errorHandler)

appDataSource
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
    createCourses()
  })
  .catch((err) => {
    console.error(err)
  })
