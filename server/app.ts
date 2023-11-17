import express,{Request,Response} from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end()
})

const port = 5000;
const server = app.listen(port, () => console.log(`Ejecutándose en el puerto http://localhost:${port}`));




export {server, app};
