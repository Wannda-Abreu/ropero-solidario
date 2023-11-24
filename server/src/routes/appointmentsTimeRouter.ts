import { Router } from 'express';
import { getAppointmentTimes, getAppointmentTime, createAppointmentTime, updateAppointmentTime, deleteAppointmentTimeById} from '../controllers/appointmentsTimeController';

const appointmentsTimeRouter = Router();

appointmentsTimeRouter.get('/', getAppointmentTimes);
appointmentsTimeRouter.get('/:id', getAppointmentTime);
appointmentsTimeRouter.post('/', createAppointmentTime);
appointmentsTimeRouter.put('/', updateAppointmentTime);
appointmentsTimeRouter.delete('/:id', deleteAppointmentTimeById);

export default appointmentsTimeRouter;