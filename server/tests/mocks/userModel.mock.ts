import { openConnectionDB, closeConnectionDB } from "../../src/config/dbRoperoSolidario";
import User from "../../src/types/userTypes";
import MOCKDBCONFIG from "./dbConfig.mock";

const openConnection = openConnectionDB(MOCKDBCONFIG);

class UserModelMock  {
    static async findAll(): Promise<User[] | null>{
        let connection = await openConnection;
        if(!connection){throw new Error ('Failed to connect to the DataBase')}
        const [users, metadata] = await connection.query('SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, nationality, BIN_TO_UUID(family_members_id) AS family_members_id,BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users;') 
        await closeConnectionDB(connection);
        return users as User[];
    }

    static async findById (id:string): Promise< User | null> {
        let connection = await openConnection;
        if(!connection){throw new Error ('Failed to connect to the DataBase')}
        const[user, metadata] = await connection.query(`SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, nationality, BIN_TO_UUID(family_members_id) AS family_members_id,BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users WHERE user_id = UUID_TO_BIN("${id}")`)
        await closeConnectionDB(connection);
        return (user as User[]).at(0) || null;
    }
 
 

}
export default UserModelMock;