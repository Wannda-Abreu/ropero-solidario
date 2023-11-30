import Appointment from "../types/apointmentTypes"; 
import db from "../config/dbConfig.sequelize";

class AppointmentFilterModel {
    static async findByDateRange(startYear: string, startMonth: string, startDay: string, endYear: string, endMonth: string, endDay:string): Promise<Appointment[] | null> {
        try {
            if (!startYear || !startMonth ||!startDay || !endYear || !endMonth || !endDay) {
                console.error('Faltan parámetros de fecha.');
                return null;
            }

            const queryString = `
                SELECT
                    BIN_TO_UUID(appointment_id) AS appointment_id,
                    appointment_day,
                    appointment_month,
                    appointment_year,
                    BIN_TO_UUID(appointment_time_id) AS appointment_time_id,
                    appointment_timeC
                FROM Appointments
                WHERE
                    CONCAT(appointment_year, '-', LPAD(appointment_month, 2, '0'), '-', LPAD(appointment_day, 2, '0')) BETWEEN
                    CONCAT('${startYear}-${startMonth}-01') AND
                    CONCAT('${endYear}-${endMonth}-31')
                    AND appointment_year IS NOT NULL
                    AND appointment_month IS NOT NULL;
            `;

            console.log('SQL Query:', queryString);

            const [appointments, metadata] = await db.query(queryString);

            console.log('Appointments:', appointments);

            return appointments as Appointment[] || null;
        } catch (error) {
            console.error('Error in findByDateRange:', error);
            return null;
        }
    }
}

export default AppointmentFilterModel;
