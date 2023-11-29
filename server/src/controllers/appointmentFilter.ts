import AppointmentFilterModel from "../models/appointmentFilter";
import { Request, Response } from 'express';

const monthNameToNumber = {
  January: '01',
  February: '02',
  March: '03',
  April:'4',
  May:'5',
  June:'6'
};

export const GetAppointmentsByDateRange = async (req: Request, res: Response) => {
  try {
    const startYear = req.params.startYear as string;
    const startMonth = monthNameToNumber[req.params.startMonth as string];
    const startDay = req.params.startDay as string;
    const endYear = req.params.endYear as string;
    const endMonth = monthNameToNumber[req.params.endMonth as string];
    const endDay = req.params.startDay as string;

    console.log('startYear:', startYear);
    console.log('startMonth:', startMonth);
    console.log('endYear:', endYear);
    console.log('endMonth:', endMonth);

    const appointments = await AppointmentFilterModel.findByDateRange(
      startYear, startMonth, startDay, endYear, endMonth, endDay
    );

    res.json(appointments);
  } catch (error: unknown) {
    console.error('Error en GetAppointmentsByDateRange:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};


