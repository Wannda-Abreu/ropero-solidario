import express,{Request,Response} from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRoutes'


const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);


app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end()
})

const server = app.listen(port, () => console.log(`Ejecutándose en el puerto http://localhost:${port}`));




export {server, app};
