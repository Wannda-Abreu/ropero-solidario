import AppointmentsTime from "../types/apointmentTimes";
import db from "../config/dbConfig.sequelize";

class AppointmentTimeModel {

    static async findAll(): Promise<AppointmentsTime[] | null> {
        const [appointmentTimes, metadata] = await db.query(
            'SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id, available_times, is_active FROM appoitment_times;'
        );
        return appointmentTimes as AppointmentsTime[];
    }

    static async findById(id: string): Promise<AppointmentsTime | null> {
        const [appointmentTime, metadata] = await db.query(
            'SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id, available_times, is_active FROM appoitment_times WHERE appointment_time_id = UUID_TO_BIN(?)',
            {
                replacements: [id],
            }
        );
        return (appointmentTime as AppointmentsTime[]).at(0) || null;
    }

    static async create(appointmentTime: AppointmentsTime): Promise<Object | null> {
        const { available_times, is_active } = appointmentTime;
        const [newAppointmentTime, metadata] = await db.query(
            'INSERT INTO appoitment_times (appointment_time_id, available_times, is_active) VALUES (UUID_TO_BIN(UUID()), ?, ?);',
            {
                replacements: [available_times, is_active],
            }
        );
        const [appointmentTimeId] = await db.query('SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id FROM Appoitment_times ORDER BY appointment_time_id DESC LIMIT 1;');

        if (typeof  appointmentTimeId !== 'object') {return null;}
        
        return  appointmentTimeId;
       
    }

    static async update(appointmentTime: AppointmentsTime, id: string): Promise<AppointmentsTime | null> {
        const { available_times, is_active } = appointmentTime;
        await db.query('UPDATE appoitment_times SET available_times = ?, is_active = ? WHERE appointment_time_id = UUID_TO_BIN(?)', {
            replacements: [available_times, is_active, id],
        });

        const updatedAppointmentTime = await AppointmentTimeModel.findById(id);
        const updatedAppointmentTimeAsAppointmentTime = updatedAppointmentTime as unknown as AppointmentsTime;
        if (typeof updatedAppointmentTimeAsAppointmentTime !== 'object') {
            return null;
        }
        return updatedAppointmentTime;
    }

    static async eliminateById(id: string): Promise<AppointmentsTime | null> {
        let eliminatedAppointmentTime = AppointmentTimeModel.findById(id);
        await db.query('DELETE FROM appoitment_times WHERE appointment_time_id = UUID_TO_BIN(?)', {
            replacements: [id],
        });

        const eliminatedAppointmentTimeAsAppointmentTime = eliminatedAppointmentTime as unknown as AppointmentsTime;
        if (typeof eliminatedAppointmentTimeAsAppointmentTime !== 'object') {
            return null;
        }
        return eliminatedAppointmentTimeAsAppointmentTime;
    }

    static async findAppointmentTimesByDay(day: string): Promise<AppointmentsTime[] | null> {
        const [appointmentTimes, metadata] = await db.query(
            `SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id, available_times, is_active FROM appoitment_times WHERE some_column_related_to_day = ?`,
            {
                replacements: [day],
            }
        );
        return appointmentTimes as AppointmentsTime[];
    }

    static async eliminateAppointmentTimesByDay(day: string): Promise<AppointmentsTime | null> {
        let eliminatedAppointmentTime = AppointmentTimeModel.findAppointmentTimesByDay(day);
        await db.query('DELETE FROM appoitment_times WHERE some_column_related_to_day = ?', {
            replacements: [day],
        });

        const eliminatedAppointmentTimeAsAppointmentTime = eliminatedAppointmentTime as unknown as AppointmentsTime;
        if (typeof eliminatedAppointmentTimeAsAppointmentTime !== 'object') {
            return null;
        }
        return eliminatedAppointmentTimeAsAppointmentTime;
    }
}

export default AppointmentTimeModel;