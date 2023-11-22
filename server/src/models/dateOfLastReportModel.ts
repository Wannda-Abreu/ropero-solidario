import DateOfLastReport from "../types/dateOfLastReportTypes";
import db from "../config/dbConfig.sequelize"

class DateOfLastReportModel {
    static async  findAll(): Promise<DateOfLastReport[] | null> {
        const [dateOfLastReports, metadata] = await db.query ('SELECT BIN_TO_UUID (date_of_last_report_id) AS date_of_last_report_id,day_of_last_report from Dates_of_last_report ')
        return dateOfLastReports as DateOfLastReport[];
    }

    static async findById(id: string):Promise<DateOfLastReport | null> {
        const [DateOfLastReport, metadata] = await db.query('SELECT BIN_TO_UUID (date_of_last_report_id) AS date_of_last_report_id,day_of_last_report from Dates_of_last_report')
        return ( DateOfLastReport as DateOfLastReport[]).at(0) || null;
    }

    static async create(DateOfLastReportData:DateOfLastReport): Promise<DateOfLastReport | null> {
        const{date_of_last_report_id, day_of_last_report } = DateOfLastReportData;
        const [newDateOfLastReport, metadata] =await db.query('INSERT INTO Dates_of_last_report (date_of_last_report_id, day_of_last_report) VALUES (UUID_TO_BIN(UUID()), ?)',
        {
            replacements: [day_of_last_report],
        }
        );
        const newDateOfLastReportAs = newDateOfLastReport as unknown as DateOfLastReport;
        if (
            typeof newDateOfLastReportAs !== 'object') { return null; }

        return newDateOfLastReportAs;
      }
    
 
    static async update(DateOfLastReportData: DateOfLastReport, id: string): Promise<DateOfLastReport | null> {
        try {
            const { date_of_last_report_id, day_of_last_report } = DateOfLastReportData;
            await db.query(
                'UPDATE Dates_of_last_report SET day_of_last_report = ? WHERE date_of_last_report_id = UUID_TO_BIN(?)',
                {
                  replacements: [day_of_last_report, id],
                }
            );
            const updatedDateOfLastReport = await DateOfLastReportModel.findById(id);
            return updatedDateOfLastReport || null;
            } catch (error) {
              console.error('Error updating DatesOfLastReport:', error);
              throw error; 
            }
        }

    static async deleteById(id: string): Promise<DateOfLastReport | null> {
        let deleteDateOfLastReport = await DateOfLastReportModel.findById(id);
        await db.query('DELETE FROM Dates_of_last_report WHERE day_of_last_report = UUID_TO_BIN(?)',
              {
                replacements: [id]
              });
        const eliminatedDateOfLastReport = deleteDateOfLastReport as unknown as DateOfLastReport;
    
            if (typeof  eliminatedDateOfLastReport !== 'object') { return null; }
    
            return  eliminatedDateOfLastReport;
    }
                
          

      
    
}

export default DateOfLastReportModel;