import mysql, { Connection } from 'mysql2/promise';
import DbConfig from '../types/dbConfig';

export const openConnectionDB = async (config: DbConfig): Promise<Connection> => {
  const connection = await mysql.createConnection(config);
  return connection;
};


export const closeConnectionDB = async(connection: mysql.Connection) => {
    
    try {      
        await connection.end();
    } catch (error: unknown) {
        console.log(`Error closing the database connection: ${{message:(error as Error).message}}`)
        throw error as Error;
    }
 }
