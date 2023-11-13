import DATA from './dbData';
import DbConfig from '../types/dbConfig';

const DBCONFIG: DbConfig = {
    host:'localhost',
    database: DATA.database,
    user: 'root',
    password: DATA.password,
    port: 3306
}

export default DBCONFIG