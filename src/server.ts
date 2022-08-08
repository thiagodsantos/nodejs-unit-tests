import { createExpressServer } from 'routing-controllers';
import { config } from '@src/env';

export async function initServer() {
  const app = createExpressServer({
    controllers: [__dirname + '/modules/**/controllers/*{.js,.ts}'],
    development: config.app.debug === true
  });
  
  try {
    await app.listen(config.app.port, () => console.info (`Server started in port ${config.app.port}...`));
  } catch (error) {
    console.error(error);
    throw new Error('Server not started...');
  }
}