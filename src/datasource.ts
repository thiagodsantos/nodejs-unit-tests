import { DataSource } from "typeorm";
import { config } from "@src/env";

export const datasource = new DataSource({
  type: "mariadb",
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.username,
  password: config.database.password,
  entities: [__dirname + '/modules/**/entities/*{.js,.ts}'],
  migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  logging: "all",
});