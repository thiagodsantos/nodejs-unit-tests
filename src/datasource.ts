import { DataSource } from 'typeorm';
import { config } from './env';

export const datasource = new DataSource({
  type: 'mariadb',
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.username,
  password: config.database.password,
  entities: [__dirname + '/modules/**/entities/*{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  logging: config.app.debug ? 'all' : ['error', 'migration'],
  logger: 'advanced-console'
});

export async function initDatabase() {
  try {
    console.info('Datasource initializing...');
    await datasource.initialize();
    console.info('Datasource initialized...');
  } catch (error) {
    console.error(error);
    throw new Error('Datasource not initialized...');
  }
}