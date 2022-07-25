import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

const app = createExpressServer({
    controllers: [__dirname + '/modules/**/controllers/*{.js,.ts}'],
});

// Start server
app.listen(process.env.PORT ?? 4200, () => console.info ('Server started...'));