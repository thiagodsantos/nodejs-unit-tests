import express, { Request, Response, Router } from 'express';

const app = express();
const routes = Router();

// JSON Support
app.use(express.json());

// Routes
routes.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Node.js tests' });
});

// Include routes
app.use(routes);

// Start server
app.listen(process.env.PORT ?? 4200, () => console.info ('Server started...'));