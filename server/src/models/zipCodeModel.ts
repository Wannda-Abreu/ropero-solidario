import { openConnectionDB, closeConnectionDB } from "../config/dbRoperoSolidario";
import ZipCode from "../types/zipCodeTypes";
import { DBCONFIG } from "../config/dbConfig";

const openConnection = openConnectionDB(DBCONFIG);

class ZipCodeModel {
   static async  findAll(): Promise<ZipCode[] | null>{
       let connection = await openConnection;
       if(!connection){throw new Error ('Failed to connect to DB')}
       const [zipCodes, metadata] = await connection.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM  ZIPCode')
       await closeConnectionDB(connection);
       return zipCodes as ZipCode[];
    }
}
export default ZipCodeModel;