import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { config } from "@src/env";
import { datasource } from "@src/datasource";

async function initDatabase() {
  try {
    await datasource.initialize();
    console.info('Datasource initialized...');
  } catch (error) {
    console.error(error);
    throw new Error('Datasource not initialized...');
  }
}

async function initServer() {
  const app = createExpressServer({
    controllers: [__dirname + '/modules/**/controllers/*{.js,.ts}'],
    development: true
  });
  
  try {
    app.listen(config.app.port, () => console.info ('Server started...' + config.app.port));
  } catch (error) {
    console.error(error);
    throw new Error('Server not started...');
  }
}

async function setUp() {
  await initDatabase();
  await initServer();
}

setUp().then(() => console.info('Application is ready!'));