import { openConnectionDB, closeConnectionDb } from "../config/dbRoperoSolidario";
import User from "../types/userTypes";

const UserModel = {
    async findAll(): Promise<User[] | null>{
        let connection = await openConnectionDB();
        if(!connection){throw new Error ('Failed to connect to the DataBase')}
        const [users, metadata] = await connection.query('SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, family_members, underage, nationality, BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users;')
        await closeConnectionDb(connection);
        return users as User[];
    },

    

}
export default UserModel;