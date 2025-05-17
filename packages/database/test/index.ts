import { AppDataSource } from "@repo/database"

AppDataSource.initialize()
  .then(() => {
    console.log("Successfully initialized!")
    process.exit(0)
  })
  .catch((e) => {
    console.error("Failed to initialize AppDataSource")
    console.error(e)
    process.exit(1)
  })
