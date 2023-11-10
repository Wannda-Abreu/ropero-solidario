import mysql,{Connection} from 'mysql2/promise';
import DbConfig from '../types/dbConfig';

//Repensar toda esta lógica, ya que da problemas con los test a la hora de abrir y cerrar la conexion a la DB.

export const openConnectionDB = async (config: DbConfig): Promise<Connection> => {
  let connection: Connection | null = null;

  try {
    connection = await mysql.createConnection(config);
    connection.connect;
    return connection;
  } catch (error) {
    console.error(`Error opening the database connection: ${(error as Error).message}`);
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error(`Error closing the database connection: ${(closeError as Error).message}`);
      }
    }
    throw error;
  }
};
 


export const closeConnectionDB = async(connection: mysql.Connection) => {
    
    try {      
        await connection.end();
    } catch (error: unknown) {
        console.log(`Error closing the database connection: ${{message:(error as Error).message}}`)
        throw error as Error;
    }
 }
