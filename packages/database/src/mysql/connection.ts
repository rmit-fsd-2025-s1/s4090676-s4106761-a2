import { DataSource } from "typeorm";

if (!process.env.DB_USER || !process.env.DB_NAME || !process.env.DB_PASSWORD ) {
  throw new Error("Missing DB_USER or DB_NAME or DB_PASSWORD");
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [],
  migrations: [],
  subscribers: [],
});