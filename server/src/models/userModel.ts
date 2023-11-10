import User from "../types/userTypes";
import db from "../config/dbConfig.sequelize";



class UserModel  {
    static async findAll(): Promise<User[] | null>{

        const [users, metadata] = await db.query('SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, nationality, BIN_TO_UUID(family_members_id) AS family_members_id,BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users;');
        return users as User[];
    }

    static async findById (id:string): Promise< User | null> {
        const[user, metadata] = await db.query(`SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, user_password, nationality, BIN_TO_UUID(family_members_id) AS family_members_id,BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Users WHERE user_id = UUID_TO_BIN("${id}")`);
        return (user as User[]).at(0) || null;
    }
 
}

export default UserModel;