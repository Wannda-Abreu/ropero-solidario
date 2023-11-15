import express,{ Request,Response } from 'express';
import { corsMiddleware } from './src/middlewares/cors';

const app = express();
app.use(corsMiddleware());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end()
})

const port = process.env.port ?? 3000;
const server = app.listen(port, () => console.log(`Ejecutándose en el puerto http://localhost:${port}`));

export { server, app };
