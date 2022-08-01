const app = {
  port: parseInt(process.env.APP_PORT ?? "4200"),
  debug: process.env.NODE_ENV !== "production"
}

const database = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "3306"),
  name: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
}

export const config = { app, database }