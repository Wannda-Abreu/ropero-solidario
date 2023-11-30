import {Sequelize} from 'sequelize';
import {config} from 'dotenv';

config();

const db = new Sequelize(process.env.DB_DATABASE as string, process.env.DB_USER as string , process.env.DB_PASSWORD as string , {
    host: process.env.DB_HOST as string,
    dialect:'mysql',
  });
  
export default db;