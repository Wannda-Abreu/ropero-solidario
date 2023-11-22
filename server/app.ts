import express, { Request, Response } from 'express';
import corsMiddleware from './src/middlewares/cors';
import userRouter from './src/routes/userRoutes';
import zipCodeRouter from './src/routes/zipCodeRoutes';
import appointmentRouter from './src/routes/appointmentsRoutes';
import { adminRouter } from './src/routes/auth.routes';
import DateOfLastReportRouter from './src/routes/dateOfLastReportRouter';
import familyInfoRouter from './src/routes/familyInfoRoutes';
import referenceCenterRouter from './src/routes/reference-center';
import telephoneRouter from './src/routes/telephones';

const app = express();
app.use(corsMiddleware());
app.use(express.json());

app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/appoinmentsTime', appointmentRouter);
app.use('/adminUser', adminRouter);
app.use('/ZIPCodes', zipCodeRouter);
app.use('/dayOfLastReport', DateOfLastReportRouter);
app.use('/familyInfos', familyInfoRouter);
app.use('/referenceCenter', referenceCenterRouter);
app.use('/telephones', telephoneRouter);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end();
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
