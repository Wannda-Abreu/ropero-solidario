import { Request, Response } from 'express';
import AppointmentTimeModel from '../models/appointmentTimesModel';
import AppointmentsTime from '../types/apointmentTimes';

const getAppointmentTimes = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const appointmentTimes = await AppointmentTimeModel.findAll();

    if (!appointmentTimes) {
      return res.status(404).json({ message: 'Appointment times not found' });
    }
    return res.status(200).json(appointmentTimes);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const getAppointmentTime = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointmentTimeId = req.params.id;
    const appointmentTime = await AppointmentTimeModel.findById(appointmentTimeId);

    if (!appointmentTime) {
      return res.status(404).json({ message: 'Appointment time not found' });
    }
    return res.status(200).json(appointmentTime);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};




const createAppointmentTime = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {available_times, is_active, } = req.body;

    if (!available_times|| !is_active) {
      return res.status(400).json({ message: 'Invalid Request data. All fields are required.' });
    }

    const appointmentTimeId = await AppointmentTimeModel.create(req.body);

    return res.status(201).json(appointmentTimeId);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const updateAppointmentTime = async (req: Request, res: Response): Promise<Response> => {
  
    try {

      const {available_times, is_active} = req.body;
  
      
      await AppointmentTimeModel.update({available_times, is_active});
  
      return res.status(200).json({ mensaje: 'Datos actualizados correctamente' });
    } catch (error) {
      console.error('Error al actualizar los datos por available_times:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

const deleteAppointmentTimeById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const appointmentTimeId = req.params.id;
    const eliminatedAppointmentTime = await AppointmentTimeModel.eliminateById(appointmentTimeId);

    if (!eliminatedAppointmentTime) {
      return res.status(404).json({ message: 'Appointment time Not Found' });
    }
    return res.status(200).json({ message: 'The Appointment time has been Eliminated!' });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export {getAppointmentTimes, getAppointmentTime, createAppointmentTime, updateAppointmentTime, deleteAppointmentTimeById};
