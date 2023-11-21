import express,{Request,Response} from 'express';
import corsMiddleware from './src/middlewares/cors';
import userRouter from './src/routes/userRoutes';
import zipCodeRouter from './src/routes/zipCodeRoutes';
import familyInfoRouter from './src/routes/familyInfoRoutes';
import appointmentRouter from './src/routes/appointmentsRoutes';
import appointmentsTimeRouter from './src/routes/appointmentsTimeRouter';


const app = express();
app.use(corsMiddleware());
app.use(express.json());

app.use('/users', userRouter);
app.use('/zipcodes', zipCodeRouter);
app.use('/familyInfos', familyInfoRouter);
app.use('/appointments', appointmentRouter);
app.use('/appointmentsTime', appointmentsTimeRouter);


app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end();
})





export default app;

