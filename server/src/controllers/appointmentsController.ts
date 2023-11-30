import { Request, Response } from 'express';
import AppointmentModel from '../models/appointmentsModel';

const getAppointments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { month, year } = req.query;
        const searchCriteria: any = {};
        
        if (month) {
            searchCriteria.appointment_month = month;
        }

        if (year) {
            searchCriteria.appointment_year = year;
        }

        const appointments = await AppointmentModel.findAll({ where: searchCriteria });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'Appointments not found' });
        }

        return res.status(200).json(appointments);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const getAppointment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const appointmentId = req.params.id;
        const appointment = await AppointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        return res.status(200).json(appointment);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const createAppointment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { appointment_day, appointment_month, appointment_year, appointment_timeC} = req.body;

        if (!appointment_day || !appointment_month || !appointment_year || !appointment_timeC) {
            return res.status(400).json({ message: 'Invalid Request data. All fields are required.' });
        }

        const appointmentId = await AppointmentModel.create(req.body);

        return res.status(201).json(appointmentId);
    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }
};

const updateAppointment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { appointment_day, appointment_month, appointment_year, appointment_time_id } = req.body;

        if (!appointment_day || !appointment_month || !appointment_year) {
            return res.status(400).json({ message: 'Invalid data. All fields are required.' });
        }

        const appointmentId = req.params.id;
        await AppointmentModel.update(req.body, appointmentId);
        return res.status(200).json({ message: 'The appointment has been updated successfully!' });
    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }
};

const deleteAppointmentById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const appointmentId = req.params.id;
        const eliminatedAppointment = await AppointmentModel.eliminateById(appointmentId);

        if (!eliminatedAppointment) {
            return res.status(404).json({ message: 'Appointment Not Found' });
        }

        return res.status(200).json({ message: 'The Appointment has been Eliminated!' });
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointmentById };
