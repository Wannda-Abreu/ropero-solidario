import User from "../types/userTypes";
import db from "../config/dbConfig.sequelize";
import UserId from "../types/id-types/userId";
import { QueryTypes } from "sequelize";


class UserModel  {

    static async findAll(): Promise<User[] | null>{

        const [users, metadata] = await db.query('SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, nationality, BIN_TO_UUID(date_of_last_report_id) AS date_of_last_report_id, BIN_TO_UUID(family_members_id) AS family_members_id, BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id, BIN_TO_UUID(appointment_id) AS appointment_id FROM Users;');
        return users as User[];
    }

    static async findById(id: string): Promise<User | null> {
        const [user, metadata] = await db.query(`
            SELECT 
                BIN_TO_UUID(u.user_id) AS user_id,
                u.user_name,
                u.surname,
                u.nationality,
                BIN_TO_UUID(u.date_of_last_report_id) AS date_of_last_report_id,
                BIN_TO_UUID(u.family_members_id) AS family_members_id,
                BIN_TO_UUID(u.zip_code_id) AS zip_code_id,
                BIN_TO_UUID(u.reference_center_id) AS reference_center_id,
                BIN_TO_UUID(dlr.date_of_last_report_id) AS dlr_id,
                dlr.day_of_last_report,
                BIN_TO_UUID(fi.family_info_id) AS family_info_id,
                fi.number_of_family_members,
                fi.underaged_family_members,
                fi.overaged_family_members,
                BIN_TO_UUID(zc.zip_code_id) AS zip_code_id,
                zc.zip_code,
                BIN_TO_UUID(rc.reference_center_id) AS reference_center_id,
                rc.reference_center
            FROM 
                Users u
            LEFT JOIN
                Dates_of_last_report dlr ON u.date_of_last_report_id = dlr.date_of_last_report_id
            LEFT JOIN
                Families_info fi ON u.family_members_id = fi.family_info_id
            LEFT JOIN
                ZIPCodes zc ON u.zip_code_id = zc.zip_code_id
            LEFT JOIN
                Reference_centers rc ON u.reference_center_id = rc.reference_center_id
            WHERE 
                u.user_id = UUID_TO_BIN("${id}")
        `);
    
        return (user as User[]).at(0) || null;
    }
    
    static async create(user: User): Promise<User | null> {
        const { user_name, surname, nationality, date_of_last_report_id, family_members_id, zip_code_id, reference_center_id, appointment_id } = user;
    
        const [newUser, metadata] = await db.query(
            'INSERT INTO Users (user_name, surname, nationality, date_of_last_report_id, family_members_id, zip_code_id, reference_center_id, appointment_id) VALUES (?, ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?));',
            {
                replacements: [
                    user_name,
                    surname,
                    nationality,
                    date_of_last_report_id || null,
                    family_members_id || null,
                    zip_code_id || null,
                    reference_center_id || null,
                    appointment_id || null
                ],
            }
        );
    
       
        const userIdResult = await db.query('SELECT BIN_TO_UUID(user_id) AS user_id FROM Users ORDER BY created_at DESC LIMIT 1');
    
        if (userIdResult === null || typeof userIdResult !== 'object') {
            return null;
        }
    

            // @ts-ignore

        const userIds = userIdResult.map((result) => result[0]?.user_id);
    
        
        const userId = userIds.length > 0 ? userIds[0] : null;
    
        return userId as unknown as User;
    }
    
   
    static async update(user: Partial<User>, id: string): Promise<User | null> {
        try {
            const filteredFields: Partial<User> = {};
            Object.keys(user).forEach((key) => {
                const userKey = key as keyof User;
                if (userKey in user && user[userKey] !== undefined) {
                    filteredFields[userKey] = user[userKey];
                }
            });

            const setClause = Object.keys(filteredFields).map(field => `${field} = ?`).join(', ');

            await db.query(`UPDATE User SET ${setClause} WHERE user_id = UUID_TO_BIN(?)`,
                {
                    replacements: [...Object.values(filteredFields), id],
                    type: QueryTypes.UPDATE,
                });

            return { ...user, user_id: id } as User;
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }
    
    
    static async eliminateById(id: string): Promise< User | null>{ 
        let eliminatedUser = UserModel.findById(id);
        await db.query('DELETE FROM Users WHERE user_id = UUID_TO_BIN(?)',
        {
            replacements: [id]
        })
        const eliminatedUserAsUser = eliminatedUser as unknown as User;
        if (typeof eliminatedUserAsUser !== 'object') {return null;}
        return eliminatedUserAsUser;
        
    }
    static async findByName(name:string):Promise< User[] | null>{
        const[user, metadata] = await db.query('SELECT BIN_TO_UUID(user_id) AS user_id, user_name, surname, nationality, BIN_TO_UUID(date_of_last_report_id) AS date_of_last_report_id, BIN_TO_UUID(family_members_id) AS family_members_id,BIN_TO_UUID(zip_code_id) AS zip_code_id, BIN_TO_UUID(reference_center_id) AS reference_center_id, BIN_TO_UUID(appointment_id) AS appointment_id FROM Users WHERE user_name = ?',
        {
            replacements: [name]
        }
        );
        return user as User[];

    }

    

    static async eliminateByName(name: string): Promise< User | null>{
        let eliminatedUser = await UserModel.findByName(name);
        await db.query('DELETE FROM Users WHERE user_name = ?',
        {
            replacements: [name]
        })
        const eliminatedUserAsUser = eliminatedUser as unknown as User;
        if (typeof eliminatedUserAsUser !== 'object') {return null;}
        return eliminatedUserAsUser;
        
    }
    
}

export default UserModel; 