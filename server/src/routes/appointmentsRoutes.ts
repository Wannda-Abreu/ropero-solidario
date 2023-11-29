// Importa tus controladores
import {
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointmentById,
  } from '../controllers/appointmentsController'; // Cambiado el nombre del controlador
  
  import { GetAppointmentsByMonthAndYear} from '../controllers/appointmentFilter';
  
  import { Router } from 'express';
  
  const appointmentRouter = Router();
  
  appointmentRouter.get('/', getAppointments);
  appointmentRouter.get('/:id', getAppointment);
  appointmentRouter.post('/', createAppointment);
  appointmentRouter.put('/:id', updateAppointment);
  appointmentRouter.patch('/:id', updateAppointment);
  appointmentRouter.delete('/:id', deleteAppointmentById);
  appointmentRouter.get('/filter/:month/:year', GetAppointmentsByMonthAndYear);
  
  export default appointmentRouter;
  