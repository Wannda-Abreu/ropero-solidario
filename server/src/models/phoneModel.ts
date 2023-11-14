import { DBCONFIG } from "../config/dbConfig";
import { openConnectionDB, closeConnectionDB } from "../config/dbRoperoSolidario";
import phoneTypes from '../types/phoneTypes.ts'

const openConnection = openConnectionDB(DBCONFIG);

class PhoneModel {
  static async findAll(): Promise<phoneTypes[] | null> {
    const connection = await openConnection;
    try {
      return (await connection).query('SELECT BIN_TO_UUID(telephone_id) AS telephone_id, telephone FROM Telephones');
    } catch {
      if (!connection) {thorow new Error('Failed to connect to DB') }
      await closeConnectionDB(connection)
      
    } 
} 
}