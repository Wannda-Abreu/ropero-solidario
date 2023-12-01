import AppointmentFilterModel from "../models/appointmentFilter";
import { Request, Response } from 'express';


const GetAppointmentsByDateRange = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { startYear, startMonth, startDay, endYear, endMonth, endDay } = req.params;

        const convertedStartMonth = [startMonth] || startMonth;
        const convertedEndMonth = [endMonth] || endMonth;

        console.log('Received Params:', req.params);
        console.log('Start Date:', `${startYear}-${convertedStartMonth}-${startDay}`);
        console.log('End Date:', `${endYear}-${convertedEndMonth}-${endDay}`);

        const appointments = await AppointmentFilterModel.findByDateRange(
            startYear, startMonth, startDay, endYear, endMonth, endDay
        );

        console.log('Returned Appointments:', appointments);

        if (!appointments || appointments.length === 0) {
            console.error('No appointments found within the specified date range.');
            return res.status(404).json({ message: 'No appointments found.' });
        }

        return res.json(appointments);
    } catch (error: unknown) {
        console.error('Error in GetAppointmentsByDateRange:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

export default GetAppointmentsByDateRange;
