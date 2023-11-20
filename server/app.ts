import express,{Request,Response} from 'express';
import corsMiddleware from './src/middlewares/cors';
import userRouter from './src/routes/userRoutes';
import zipCodeRouter from './src/routes/zipCodeRoutes';
// import familyInfoRouter from './src/routes/familyInfoRouter';


const app = express();
app.use(corsMiddleware());
app.use(cookieParser());
app.use(express.json());

app.use('/users', userRouter);
app.use('/zipcode', zipCodeRouter);
// app.use('familyInfo', familyInfoRouter)

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end();
})





export default app;

  function cookieParser(): any {
    throw new Error('Function not implemented.');
  }

