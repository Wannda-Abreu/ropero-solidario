import express, { Request, Response } from 'express';
import corsMiddleware from './src/middlewares/cors';


import userRouter from './src/routes/userRoutes';
import zipCodeRouter from './src/routes/zipCodeRoutes';
import appointmentRouter from './src/routes/appointmentsRoutes';
import { adminRouter } from './src/routes/adminUserRoutes';
import DateOfLastReportRouter from './src/routes/dateOfLastReportRouter';
import familyInfoRouter from './src/routes/familyInfoRouter';
import referenceCenterRouter from './src/routes/referenceCenterRouter';
import telephoneRouter from './src/routes/telephonesRouter';
import appointmentsTimeRouter from './src/routes/appointmentsTimeRouter';
import AdminRolesRouter from './src/routes/adminUserRoleRoutes';
import Rolesrouter from './src/routes/rolesRoutes';




const app = express();

app.use(corsMiddleware);
app.use(express.json());


app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/appointmentsTime', appointmentsTimeRouter);
app.use('/adminUser', adminRouter);
app.use('/ZIPCodes', zipCodeRouter);
app.use('/dayOfLastReport', DateOfLastReportRouter);
app.use('/familyInfos', familyInfoRouter);
app.use('/referenceCenter', referenceCenterRouter);
app.use('/telephones', telephoneRouter);
app.use('/roles', Rolesrouter)
app.use('/AdminRoles', AdminRolesRouter)



app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bienvenido al servidor del Ropero Solidario!!!');
  res.end();
});


export default app;
