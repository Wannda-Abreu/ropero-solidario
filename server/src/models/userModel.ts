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

    static async create(user: User): Promise<User | null> {
        const { user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id } = user;
        const [newUser, metadata] = await db.query(
            'INSERT INTO Users (user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id) VALUES (?, ?, ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?))',
            {
                replacements:
                [user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id],
            }
        );
    
        const newUserAsUser = newUser as unknown as User;
        if (typeof newUserAsUser !== 'object') {return null;}
        return newUserAsUser;
        
    }
    static async update(user:User, id: string): Promise<User| null>{
        const { user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id } = user;
        await db.query('UPDATE Users SET user_name = ?, surname = ?, user_password = ?, nationality = ?, family_members_id = UUID_TO_BIN(?), zip_code_id = UUID_TO_BIN(?), reference_center_id = UUID_TO_BIN(?) WHERE user_id = UUID_TO_BIN(?)',
        {
            replacements:
            [user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id, id],
        });
        const  updatedUser = await UserModel.findById(id);
        const updatedUserAsUser = updatedUser as unknown as User;
        if (typeof updatedUserAsUser !== 'object') {return null;}
        return updatedUserAsUser;
    }
    static async eliminateById(id: string): Promise< User | null>{ 
        let eliminatedUser = UserModel.findById(id);
        await db.query('DELETE FROM Users WHERE user_id = UUID_TO_BIN(?)',
        {
            replacements: [id]
        })
        const eliminatedUserAsUser = eliminatedUser as unknown as User;
        if (typeof eliminatedUserAsUser !== 'object') {return null;}
        console.log(eliminatedUser);
        return eliminatedUserAsUser;
        
    }
    


 
}

export default UserModel; 