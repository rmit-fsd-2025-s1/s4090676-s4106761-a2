import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "../entities/account"
import { TutorAccount } from "../entities/tutorAccount"
import { LecturerAccount } from "../entities/lecturerAccount"
import { Application } from "../entities/application"
import { Course } from "../entities/courses"
import { AccountSession } from "../entities/accountSession"

if (!process.env.DB_USER || !process.env.DB_NAME || !process.env.DB_PASSWORD) {
  throw new Error("Missing DB_USER or DB_NAME or DB_PASSWORD")
}

export const appDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    Account,
    LecturerAccount,
    TutorAccount,
    AccountSession,
    Application,
    Course,
  ],
  migrations: [],
  subscribers: [],
})

export const entityManager = appDataSource.manager

export const getQueryBuilder = appDataSource.createQueryBuilder
