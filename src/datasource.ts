import { DataSource } from "typeorm";
import { config } from "@src/env";

export const datasource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  database: "car_dealer",
  username: "car_dealer",
  password: "passwd",
  entities: [__dirname + '/modules/**/entities/*{.js,.ts}'],
  migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  logging: "all",
});