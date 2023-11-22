import { Router } from 'express';
import {getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointmentById } from '../controllers/appointmentsController';

const appointmentRouter = Router(); 

appointmentRouter.get('/', getAppointments);
appointmentRouter.get('/:id', getAppointment);
appointmentRouter.post('/', createAppointment);
appointmentRouter.put('/:id', updateAppointment);
appointmentRouter.patch('/:id', updateAppointment);
appointmentRouter.delete('/:id', deleteAppointmentById);

export default appointmentRouter;