import Appointment from "../types/apointmentTypes"; 
import db from "../config/dbConfig.sequelize";

class AppointmentFilterModel {
    static async findByDateRange(startYear: string, startMonth: string, startDay: string, endYear: string, endMonth: string, endDay: string): Promise<Appointment[] | null> {
        try {
            if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay) {
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
                    STR_TO_DATE(
                        CONCAT(
                            appointment_year,
                            '-',
                            LPAD(
                                CASE
                                    WHEN appointment_month = 'Enero' THEN '01'
                                    WHEN appointment_month = 'Febrero' THEN '02'
                                    WHEN appointment_month = 'Marzo' THEN '03'
                                    WHEN appointment_month = 'Abril' THEN '04'
                                    WHEN appointment_month = 'Mayo' THEN '05'
                                    WHEN appointment_month = 'Junio' THEN '06'
                                    WHEN appointment_month = 'Julio' THEN '07'
                                    WHEN appointment_month = 'Agosto' THEN '08'
                                    WHEN appointment_month = 'Septiembre' THEN '09'
                                    WHEN appointment_month = 'Octubre' THEN '10'
                                    WHEN appointment_month = 'Noviembre' THEN '11'
                                    WHEN appointment_month = 'Diciembre' THEN '12'
                                END,
                                2,
                                '0'
                            ),
                            '-',
                            LPAD(appointment_day, 2, '0')
                        ),
                        '%Y-%m-%d'
                    ) BETWEEN
                    STR_TO_DATE(CONCAT('${startYear}-${startMonth}-01'), '%Y-%m-%d') AND
                    STR_TO_DATE(CONCAT('${endYear}-${endMonth}-31'), '%Y-%m-%d')
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
