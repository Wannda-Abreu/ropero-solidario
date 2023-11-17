import { openConnectionDB, closeConnectionDb } from "../config/dbRoperoSolidario";
import User from "../types/userTypes";

class UserModel  {
    static async findAll(): Promise<User[] | null>{
        let connection = await openConnectionDB();
        if(!connection){throw new Error ('Failed to connect to the DataBase')}
        const [users, metadata] = await connection.query('SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, family_members, underage, nationality, BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users;')
        await closeConnectionDb(connection);
        return users as User[];
    }

    static async findById (id:string): Promise< User | null> {
        let connection = await openConnectionDB();
        if(!connection){throw new Error ('Failed to connect to the DataBase')}
        const[user, metadata] = await connection.query(`SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, family_members, underage, overage, nationality, BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users WHERE user_id = UUID_TO_BIN("${id}")`)
        await closeConnectionDb(connection);
        return (user as User[]).at(0) || null;
    }
 

}
export default UserModel;