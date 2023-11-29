import Appointment from "../types/apointmentTypes"; 
import db from "../config/dbConfig.sequelize";

class AppointmentModel {
  static async findAll(): Promise<Appointment[] | null> {
    const [appointments, metadata] = await db.query(
      'SELECT BIN_TO_UUID(appointment_id) AS appointment_id, appointment_day, appointment_month, appointment_year, BIN_TO_UUID(appointment_time_id) AS appointment_time_id, appointment_timeC FROM Appointments;'
    );
    return appointments as Appointment[];
  }

  static async findById(id: string): Promise<Appointment | null> {
    const [appointment, metadata] = await db.query(
      `SELECT BIN_TO_UUID(appointment_id) AS appointment_id, appointment_day, appointment_month, appointment_year, BIN_TO_UUID(appointment_time_id) AS appointment_time_id, appointment_timeC FROM Appointments WHERE appointment_id = UUID_TO_BIN('${id}');`
    );
    return (appointment as Appointment[]).at(0) || null;
  }
  static async findByDateRange(startDate: string, endDate: string): Promise<Appointment[] | null> {
    try {
        const [appointments, metadata] = await db.query(`
            SELECT
                BIN_TO_UUID(appointment_id) AS appointment_id,
                appointment_day,
                appointment_month,
                appointment_year,
                BIN_TO_UUID(appointment_time_id) AS appointment_time_id,
                appointment_timeC
            FROM Appointments
            WHERE
                STR_TO_DATE(CONCAT(appointment_year, '-', appointment_month, '-', '01'), '%Y-%m-%d') BETWEEN STR_TO_DATE(?, '%Y-%m-%d') AND STR_TO_DATE(?, '%Y-%m-%d');
        `, {
            replacements: [startDate, endDate],
        });
        return appointments as Appointment[];
    } catch (error) {
        console.error('Error en findByDateRange:', error);
        return null;
    }
}



  static async create(appointment: Appointment): Promise<Appointment | null> {
    const { appointment_day, appointment_month, appointment_year, appointment_timeC } = appointment;
    const [newAppointment, metadata] = await db.query(
      'INSERT INTO Appointments (appointment_day, appointment_month, appointment_year, appointment_timeC) VALUES (?,?,?,?);',
      {
        replacements: [appointment_day, appointment_month, appointment_year, appointment_timeC],
      }
    );

    const newAppointmentAsAppointment = newAppointment as unknown as Appointment;
    if (typeof newAppointmentAsAppointment !== 'object') {
      return null;
    }
    return newAppointmentAsAppointment;
  }

  static async update(appointment: Appointment, id: string): Promise<Appointment | null> {
    const { appointment_day, appointment_month, appointment_year, appointment_timeC } = appointment;
    await db.query(
      'UPDATE Appointments SET appointment_day = ?, appointment_month = ?, appointment_year = ?, appointment_timeC = ?  WHERE appointment_id = UUID_TO_BIN(?)',
      {
        replacements: [appointment_day, appointment_month, appointment_year, appointment_timeC, id],
      }
    );
    const updatedAppointment = await AppointmentModel.findById(id);
    const updatedAppointmentAsAppointment = updatedAppointment as unknown as Appointment;
    if (typeof updatedAppointmentAsAppointment !== 'object') {
      return null;
    }
    return updatedAppointment;
  }

  static async eliminateById(id: string): Promise<Appointment | null> {
    let eliminatedAppointment = await AppointmentModel.findById(id);
    await db.query('DELETE FROM Appointments WHERE appointment_id = UUID_TO_BIN(?)', {
      replacements: [id],
    });
    const eliminatedAppointmentAsAppointment = eliminatedAppointment as unknown as Appointment;
    if (typeof eliminatedAppointmentAsAppointment !== 'object') {
      return null;
    }
    return eliminatedAppointmentAsAppointment;
  }

  static async findByDay(day: string): Promise<Appointment[] | null> {
    const [appointments, metadata] = await db.query(
      `SELECT BIN_TO_UUID(appointment_id) AS appointment_id, appointment_day, appointment_month, appointment_year,BIN_TO_UUID(appointment_time_id) AS appointment_time_id, appointment_timeC FROM Appointments WHERE appointment_day = '${day}'`
    );
    return appointments as Appointment[];
  }

  static async eliminateByDay(day: string): Promise<Appointment | null> {
    let eliminatedAppointment = await AppointmentModel.findByDay(day);
    await db.query('DELETE FROM Appointments WHERE appointment_day = ?', {
      replacements: [day],
    });
    const eliminatedAppointmentAsAppointment = eliminatedAppointment as unknown as Appointment;
    if (typeof eliminatedAppointmentAsAppointment !== 'object') {
      return null;
    }
    return eliminatedAppointmentAsAppointment;
  }
}

export default AppointmentModel;
