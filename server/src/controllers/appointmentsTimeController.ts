import { Request, Response } from 'express';
import AppointmentTimeModel from '../models/appointmentTimesModel';

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
    const {available_times, is_active } = req.body;

    if (!available_times|| !is_active) {
      return res.status(400).json({ message: 'Invalid Request data. All fields are required.' });
    }

    await AppointmentTimeModel.create(req.body);

    return res.status(201).json({ message: 'The Appointment time has been created successfully!' });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

const updateAppointmentTime = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { available_times, is_active} = req.body;

    if (!available_times|| !is_active) {
      return res.status(400).json({ message: 'Invalid data. All fields are required.' });
    }

    const appointmentTimeId = req.params.id;
    await AppointmentTimeModel.update(req.body, appointmentTimeId);
    return res.status(200).json({ message: 'The appointment time has been updated successfully!' });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
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
