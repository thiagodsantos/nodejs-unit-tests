import 'module-alias/register';
import 'reflect-metadata';
import { initDatabase } from './datasource';
import { initServer } from './server';

(async () => {
  await initDatabase();
  await initServer();
  
  console.log('Application is ready!')
})();