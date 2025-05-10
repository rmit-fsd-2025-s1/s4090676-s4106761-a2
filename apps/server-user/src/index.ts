import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: "http://localhost",
  })
)

app.use(express.json())

app.post("/example", async (req, res) => {
  res.status(200).json(JSON.stringify(req.body))
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
