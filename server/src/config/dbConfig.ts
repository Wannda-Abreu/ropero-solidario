import DATA from './dbData';
import DbConfig from '../types/dbConfig';
import { createPool, Pool } from 'mysql2/promise';

const DbConfig: Pool = createPool({
  host: 'localhost',
  user: 'root',
  password: DATA.password,
  database: DATA.database,

});

export default DbConfig;
