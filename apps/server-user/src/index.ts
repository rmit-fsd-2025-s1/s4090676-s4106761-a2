import express from "express"
import cors from "cors"
import { AppDataSource } from "@repo/database"

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json())

app.post("/example", (req, res) => {
  res.status(200).json(JSON.stringify(req.body))
})

app.get("/user", (req, res) => {
  res.status(200).json({
    name: "tim",
  })
})

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
