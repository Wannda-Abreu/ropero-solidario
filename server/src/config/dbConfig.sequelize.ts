import {Sequelize} from 'sequelize';
import DATA from './dbData';
const db = new Sequelize(DATA.database, 'root',DATA.password , {
    host: 'localhost',
    dialect:'mysql'
  });
  
export default db;