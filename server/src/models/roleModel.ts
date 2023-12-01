import { DataTypes, QueryTypes, Sequelize } from "sequelize";
import db from "../config/dbConfig.sequelize";
import rolesTypes from "../types/rolesTypes";
import Admin_UserT from "../types/AdminUserTypes";


export const Roles = db.define(
    'Roles',
    {
      roles_id: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('UUID_TO_BIN(UUID())'),
      },
      roles_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
        tableName: 'Roles',
        timestamps: false,
        freezeTableName: true
    }
);



class RolesModel {
    
    


    static async findAllRoles(): Promise<rolesTypes[] | null> {
        const [Roles, metadata] = await db.query('SELECT BIN_TO_UUID(roles_id) AS roles_id, roles_name FROM Roles;');
        return Roles as rolesTypes[];
    }

    static async findRolesById(id: string | undefined): Promise<rolesTypes | null> {
        const [Roles, metadata] = await db.query(`SELECT BIN_TO_UUID(roles_id) AS roles_id, roles_name FROM Roles WHERE roles_id = UUID_TO_BIN("${id}")`);
        return (Roles as rolesTypes[]).at(0) || null;
    }


    static async findUsersByRoleId(roleId: string): Promise<Admin_UserT[] | null> {
        try {
        const users = await db.query(
            'SELECT BIN_TO_UUID(u.admin_user_id) as admin_user_id, u.admin_name, u.admin_surname, u.email FROM Admin_User u INNER JOIN Admin_user_Roles aur ON u.admin_user_id = aur.admin_user_id WHERE aur.roles_id = UUID_TO_BIN(?)',
            {
                replacements: [roleId],
                type: QueryTypes.SELECT,
            }
        );
            return users as unknown as Admin_UserT[];
        } catch (error) {
            console.error('Error al obtener usuarios por rol:', error);
            return null;
        }
    }

    static async findUsersByRoleName(roles_name: string): Promise<rolesTypes[] | null> {
    try {
        
        const roleIdResult = await db.query(
            'SELECT BIN_TO_UUID(roles_id) as roles_id FROM Roles WHERE roles_name = ?',
            {
                replacements: [roles_name],
                type: QueryTypes.SELECT,
            }
        );

        return roleIdResult as unknown as rolesTypes[];
    } catch (error) {
        console.error('Error al obtener usuarios por rol:', error);
        return null;
    }
}


    static async createRoles(Roles: rolesTypes): Promise<rolesTypes | null> {
        try {
            const { roles_name } = Roles;
            const result = await db.query(
                'INSERT INTO Roles (roles_name) VALUES (?);',
                {
                    replacements: [roles_name]  
                    
                }
            );
    
                const newRoles = await db.query(
                    'SELECT BIN_TO_UUID(roles_id) FROM Roles WHERE roles_name = (?) ;',
                    {
                        replacements: [roles_name]
                    }
                );
                    

            return newRoles[0] as unknown as rolesTypes;


        } catch (error) {
            console.error('Error creating roles:', error);
            return null;
        }
    }
    
    
    
    
    
    static async updateRoles(Roles: rolesTypes, id: string): Promise<rolesTypes | null> {
        const { roles_name } = Roles;
        await db.query('UPDATE Roles SET roles_name = ? WHERE Roles_id = UUID_TO_BIN(?)',
            {
                replacements: [roles_name, id],
            });

        const updatedRoles = await RolesModel.findRolesById(id);

        const updatedRolesAsRoles = updatedRoles as unknown as rolesTypes;

        if (typeof updatedRolesAsRoles !== 'object') { return null; }
        return updatedRolesAsRoles;
    }

    static async eliminateRolesById(id: string): Promise<rolesTypes | null> {
        let eliminatedRoles = RolesModel.findRolesById(id);
        await db.query('DELETE FROM Roles WHERE Roles_id = UUID_TO_BIN(?)',
            {
                replacements: [id]
            })
        const eliminatedRolesAsRoles = eliminatedRoles as unknown as rolesTypes;

        if (typeof eliminatedRolesAsRoles !== 'object') { return null; }
        
        return eliminatedRolesAsRoles;
    }

    
    
}

export default RolesModel;