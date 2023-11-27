import ZIPCode from "../types/zipCodeTypes";
import db from "../config/dbConfig.sequelize";
import ZiPCodeId from "../types/zipCodeId";




class ZIPCodeModel {
   static async  findAll(): Promise<ZIPCode[] | null>{
      
    
       const [zipCodes, metadata] = await db.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM  ZIPCodes')
       return zipCodes as ZIPCode[];
    }


    static async findById(id: string): Promise<ZIPCode | null> {
        const [zipCode, metadata] = await db.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM ZIPCodes WHERE zip_code_id = UUID_TO_BIN(?);',
        {
          replacements: [id]
        }
        );
        return (zipCode as ZIPCode[]).at(0) || null;
      }

      
    static async create(zipCodeData: ZIPCode): Promise<ZiPCodeId | null> {
        const {zip_code} = zipCodeData;
        const [newZipCode, metadata] = await db.query(
          'INSERT INTO ZIPCodes (zip_code) VALUES (?);',
          {
            replacements: [zip_code],
          }
        );

        const [[zipCodeId]] = await db.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id FROM ZIPCodes ORDER BY zip_code_id DESC LIMIT 1;');

        if (typeof zipCodeId !== 'object') {return null;}
          
        return zipCodeId as ZiPCodeId;
  
      }     

    static async update(zipCodeData: ZIPCode, id: string): Promise<ZIPCode | null> {
        const { zip_code_id, zip_code } = zipCodeData;
        await db.query('UPDATE ZIPCodes SET zip_code = ? WHERE zip_code_id = UUID_TO_BIN(?);',
          {
            replacements: [zip_code, id],
          });
          console.log(zip_code);

        const updatedZipCode = await ZIPCodeModel.findById(id);
        const updatedZipCodeAsZIPCode = updatedZipCode as unknown as ZIPCode;
        
        if (typeof updatedZipCodeAsZIPCode !== 'object') { return null; }

        return updatedZipCodeAsZIPCode;
      }

    static async deleteById(id: string): Promise<ZIPCode | null> {
        let deleteZipCode = await ZIPCodeModel.findById(id);
        await db.query('DELETE FROM ZIPCodes WHERE zip_code_id = UUID_TO_BIN(?)',
          {
            replacements: [id]
          });
        const eliminatedZipCodeAsZIPCode = deleteZipCode as unknown as ZIPCode;

        if (typeof eliminatedZipCodeAsZIPCode !== 'object') { return null; }

        return eliminatedZipCodeAsZIPCode;
      }

      static async findByZipCode(zip_code:number): Promise< ZIPCode[] | null>{
        const[zipCodes, metadata] = await db.query('SELECT BIN_TO_UUID(zip_code_id) AS zip_code_id, zip_code FROM ZIPCodes WHERE zip_code = ?',
        {
          replacements: [zip_code]
        });
        return zipCodes as ZIPCode[];

    }

    

    static async eliminateByZipCode(zip_code: number): Promise< ZIPCode | null>{
        let eliminatedZipCode = await ZIPCodeModel.findByZipCode(zip_code);
        await db.query('DELETE FROM ZIPCodes WHERE zip_code = ?',
        {
            replacements: [zip_code]
        })
        const eliminatedZipCodeAsZIPCode = eliminatedZipCode as unknown as ZIPCode;
        if (typeof eliminatedZipCodeAsZIPCode !== 'object') {return null;}
        return eliminatedZipCodeAsZIPCode;
        
    } 
            

}

export default ZIPCodeModel;