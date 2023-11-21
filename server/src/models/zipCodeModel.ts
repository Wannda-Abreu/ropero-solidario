import ZIPCode from "../types/zipCodeTypes";
import db from "../config/dbConfig.sequelize";



class ZIPCodeModel {
   static async  findAll(): Promise<ZIPCode[] | null>{
      
    
       const [zipCodes, metadata] = await db.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM  ZIPCode')
       return zipCodes as ZIPCode[];
    }


    static async findById(id: string): Promise<ZIPCode | null> {
        const [zipCode, metadata] = await db.query(`SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM ZIPCode WHERE zip_code_id = UUID_TO_BIN("${id}")`);
        return (zipCode as ZIPCode[]).at(0) || null;
      }

      
    static async create(zipCodeData: ZIPCode): Promise<ZIPCode | null> {
        const { zip_code_id, zip_code } = zipCodeData;
        const [newZipCode, metadata] = await db.query(
          'INSERT INTO ZIPCode (zip_code_id, zip_code) VALUES (UUID_TO_BIN(UUID()), ?)',
          {
            replacements: [zip_code],
          }
        );
      
        const newZipCodeAsZIPCode = newZipCode as unknown as ZIPCode;
        if (
            typeof newZipCodeAsZIPCode !== 'object') { return null; }

        return newZipCodeAsZIPCode;
      }
      

    static async update(zipCodeData: ZIPCode, id: string): Promise<ZIPCode | null> {
        const { zip_code_id, zip_code } = zipCodeData;
        await db.query('UPDATE ZIPCode SET zip_code = ? WHERE zip_code_id = UUID_TO_BIN(?)',
          {
            replacements: [zip_code, id],
          });

        const updatedZipCode = await ZIPCodeModel.findById(id);
        const updatedZipCodeAsZIPCode = updatedZipCode as unknown as ZIPCode;
        
        if (typeof updatedZipCodeAsZIPCode !== 'object') { return null; }

        return updatedZipCodeAsZIPCode;
      }

    static async deleteById(id: string): Promise<ZIPCode | null> {
        let deleteZipCode = await ZIPCodeModel.findById(id);
        await db.query('DELETE FROM ZIPCode WHERE zip_code_id = UUID_TO_BIN(?)',
          {
            replacements: [id]
          });
        const eliminatedZipCodeAsZIPCode = deleteZipCode as unknown as ZIPCode;

        if (typeof eliminatedZipCodeAsZIPCode !== 'object') { return null; }

        return eliminatedZipCodeAsZIPCode;
      }
            

}

export default ZIPCodeModel;