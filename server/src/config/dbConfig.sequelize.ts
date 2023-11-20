import {Sequelize} from 'sequelize';
import DATA from './dbData';

const db = new Sequelize(DATA.database, 'root',DATA.password , {
    host: 'localhost',
    dialect:'mysql'
});

const database: Sequelize = db;

async function checkDatabaseConnection() {
  try {
    await database.authenticate();
    console.log("Connection to the database established correctly.");
  } catch (error) {
    console.error("Could not connect to the database:", error);
  }
}
checkDatabaseConnection();

database.sync({ force: false })
  .then(() => {
    console.log("Tables synchronized with the database!");
  })
  .catch((error) => {
    console.error("Error synchronizing tables with the database:", error);
  }); 
  
export default db;


