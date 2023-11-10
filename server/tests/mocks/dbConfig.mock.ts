import DbConfig from '../../src/types/dbConfig';
import DATA from '../../src/config/dbData';


const MOCKDBCONFIG: DbConfig = {
    host:'localhost',
    database: 'mock_DB',
    user: 'root',
    password: DATA.password,
    port: 3306
}

export default MOCKDBCONFIG;