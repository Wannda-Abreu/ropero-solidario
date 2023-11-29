import { Op } from "sequelize";
import AppointmentModel from "../models/appointmentsModel";
import {Request, Response} from 'express';

export const GetAppointmentsByMonthAndYear = async (req: Request, res: Response) => {
 
  try {
    const month = req.params.month;
    const year = req.params.year;

    const appointments = await AppointmentModel.findByDateRange (
    month,year  
    );
    Response.json(appointments);
}
    catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    
};
}
  

