import { Op } from "sequelize";
import AppointmentModel from "../models/appointmentsModel";

export const GetAppointmentsByMonthAndYear = async (req: Request, res: Response) => {
 
  try {
    const month = req.params.month;

    const appointments = await AppointmentModel.findByDateRange (
    month,year  
    );
    Response.json(appointments);
}
    catch (error: unknown) {
        return Response.status(500).json({ message: (error as Error).message });
    
};
}
  

