import { appDataSource, entityManager } from "../connection"
import { createCourses } from "./courses"
import { createAccounts } from "./accounts"
import { createApplications } from "./applications"

const generateClearQuery = (tableNames: string[]) =>
  `SET FOREIGN_KEY_CHECKS=0; ` +
  tableNames.reduce(
    (str, tableName) => str + `TRUNCATE TABLE ${tableName}; `,
    ""
  ) +
  `SET FOREIGN_KEY_CHECKS=1;`

await appDataSource.initialize()

/* empty database */

await entityManager.query(
  generateClearQuery(
    entityManager.connection.entityMetadatas.map((entity) => entity.tableName)
  )
)

/* load fixtures */
await createAccounts()
await createCourses()
await createApplications()

/* panic the program as this operation should be one off */
process.exit()

// Make sure to run npm run load-fixtures!!!!
