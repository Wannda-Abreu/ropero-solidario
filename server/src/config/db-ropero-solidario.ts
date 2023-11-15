import mysql,{Connection} from 'mysql2/promise';
import DATA from './db-data';
import DbConfig from '../types/dbConfig';


const DBCONFIG: DbConfig = {
    host:'localhost',
    database: DATA.database,
    user: 'root',
    password: DATA.password,
    port: 3306
}
export const openConnectionDB = async() => {
    
    try {
        const connection = await mysql.createConnection(DBCONFIG);
        return connection;
    } catch (error:unknown) {
        console.log(`Error openning the database connection: ${{message:(error as Error).message}}`)
    }
} 

export const closeConnectionDb= async(connection: mysql.Connection) => {
    
    try {      
        await connection.end();
    } catch (error: unknown) {
        console.log(`Error closing the database connection: ${{message:(error as Error).message}}`)
    }
 }
