// import { openConnectionDB, closeConnectionDB } from "../config/dbRoperoSolidario";
import ZipCode from "../types/zipCodeTypes";
import { DBCONFIG } from "../config/dbConfig";
import db from "../config/dbConfig.sequelize";



class ZipCodeModel {
   static async  findAll(): Promise<ZipCode[] | null>{
      
    
       const [zipCodes, metadata] = await db.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM  ZIPCode')
       return zipCodes as ZipCode[];
    }
}
export default ZipCodeModel;