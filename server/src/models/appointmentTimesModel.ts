import AppointmentsTime from "../types/apointmentTimes";
import db from "../config/dbConfig.sequelize";
import AppointmentsTimeId from "../types/id-types/appointmentTime";


class AppointmentTimeModel {

    static async findAll(): Promise<AppointmentsTime[] | null> {
        const [appointmentTimes, metadata] = await db.query(
            'SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id, available_times, is_active FROM Appointment_times;'
        );
        return appointmentTimes as AppointmentsTime[];
    }

    static async findById(id: string): Promise<AppointmentsTime | null> {
        const [appointmentTime, metadata] = await db.query(
            'SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id, available_times, is_active FROM Appointment_times WHERE appointment_time_id = UUID_TO_BIN(?)',
            {
                replacements: [id],
            }
        );
        return (appointmentTime as AppointmentsTime[]).at(0) || null;
    }

    static async create(appointmentTime: AppointmentsTime): Promise<AppointmentsTimeId | null> {
        const { available_times, is_active } = appointmentTime;
        await db.query(
            'INSERT INTO Appointment_times (available_times, is_active) VALUES (?, ?);',
            {
                replacements: [available_times, is_active],
            }
        );
        const [[appointmentTimeId]] = await db.query('SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id FROM Appointment_times ORDER BY appointment_time_id DESC LIMIT 1;');

        if (typeof  appointmentTimeId !== 'object') {return null;}
        
        return  appointmentTimeId as AppointmentsTimeId;
       
    }

    static async update(appointmentTime: AppointmentsTime, id: string): Promise<AppointmentsTime | null> {
        
        const { available_times, is_active } = appointmentTime;
        let updatedAppointmentTime = await db.query('UPDATE Appointment_times SET  available_times = ? , is_active = ? WHERE appointment_time_id = UUID_TO_BIN(?);', 
        {
            replacements: [available_times, is_active, id]
        });

      
        return updatedAppointmentTime as unknown as AppointmentsTime;
        
    }

    static async eliminateById(id: string): Promise<AppointmentsTime | null> {


        let eliminatedAppointmentTime = await AppointmentTimeModel.findById(id);
        await db.query('DELETE FROM Appointment_times WHERE appointment_time_id = UUID_TO_BIN(?)', {
            replacements: [id],
        });

        const eliminatedAppointmentTimeAsAppointmentTime = eliminatedAppointmentTime as unknown as AppointmentsTime;
        if (typeof eliminatedAppointmentTimeAsAppointmentTime !== 'object') {
            return null;
        }
        return eliminatedAppointmentTimeAsAppointmentTime;
    }

    static async findByTime(time: string): Promise<AppointmentsTime[] | null> {
        const [appointmentTimes, metadata] = await db.query(
            `SELECT BIN_TO_UUID(appointment_time_id) AS appointment_time_id, available_times, is_active FROM Appointment_times WHERE some_column_related_to_day = ?`,
            {
                replacements: [time],
            }
        );
        return appointmentTimes as AppointmentsTime[];
    }

    static async eliminateByTime(time: string): Promise<AppointmentsTime | null> {
        let eliminatedAppointmentTime = await AppointmentTimeModel.findByTime(time);
        await db.query('DELETE FROM Appointment_times WHERE available_times = ?', {
            replacements: [time],
        });

        const eliminatedAppointmentTimeAsAppointmentTime = eliminatedAppointmentTime as unknown as AppointmentsTime;
        if (typeof eliminatedAppointmentTimeAsAppointmentTime !== 'object') {
            return null;
        }
        return eliminatedAppointmentTimeAsAppointmentTime;
    }
}

export default AppointmentTimeModel;