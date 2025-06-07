import express, { ErrorRequestHandler } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { appDataSource } from "@repo/database/datasource"
import { protectedRoutes } from "@/protected"
import { unprotectedRoutes } from "@/unprotected"

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
    console.log("Request body: ", req.body)
    console.log("Request path: ", req.path)
    // console.log("Headers w/ request: ", req.headers)
    console.log("Request cookies: ", req.cookies)
  }
  next()
})

app.use(unprotectedRoutes)

app.use(protectedRoutes)

// err should usually be an AggregateError if the error comes from any of the routers
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AggregateError) {
    err.errors.forEach((e) => console.error(e.message, e.stack))
  } else {
    console.error(err?.message, err?.stack)
  }
  if (res.statusCode === 200) res.status(500)
  res.json({
    message: err?.errors ? err.message : "Failed. Please try again",
  })
}

app.use(errorHandler)

appDataSource
  .initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
