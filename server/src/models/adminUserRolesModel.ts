import { DataTypes } from "sequelize";
import db from "../config/dbConfig.sequelize";
import AdminRolesType from "../types/adminUserRolesTypes";
import { Admin_User } from "./adminUserModel";
import { Roles } from "./roleModel";
import AdminUserRolesType from "../types/adminUserRolesTypes";



export const AdminUserRoles = db.define(
    'AdminUserRoles',
    {
        admin_user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Admin_User,
                key: 'admin_user_id'
            }
        },
        roles_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Roles,
            key: 'roles_id'
        }

        },
    },
    {
        tableName: 'Admin_user_Roles',
        timestamps: false,
        freezeTableName: true
    }
);


class AdminRolesModel {


    static async findAllAdmiRole(): Promise<AdminRolesType[] | null> {
        const [adminRoles, metadata] = await db.query('SELECT BIN_TO_UUID(roles_id) AS roles_id, BIN_TO_UUID(admin_user_id) AS admin_user_id FROM Admin_user_Roles;');
        return adminRoles as AdminRolesType[];
    }
    
    
    static async findAdmiRoleById(id: string): Promise<AdminRolesType | null> {
        const [admiRole, metadata] = await db.query(`SELECT BIN_TO_UUID(admin_user_id) AS admin_user_id, BIN_TO_UUID(roles_id) AS roles_id FROM Admin_user_Roles WHERE admin_user_id = UUID_TO_BIN("${id}")`);
        return (admiRole as AdminRolesType[]).at(0) || null;
    }
    
    static async createAdminRole(admiRole: AdminRolesType): Promise<AdminRolesType | null> {
        const { admin_user_id, roles_id } = admiRole;
    
        const [newAdmiRole, metadata] = await db.query(
            `INSERT INTO Admin_user_Roles (admin_user_id, roles_id) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))`,
            {
                replacements: [admin_user_id,roles_id ],
            }
        );
    
        const newAdmiRoleAsAdmiRole = newAdmiRole as unknown as AdminRolesType;
        if (typeof newAdmiRoleAsAdmiRole !== 'object') { return null; }
        return newAdmiRoleAsAdmiRole;
    }
    
    static async updateAdmiRole(admiRole: AdminRolesType, adminUserId: string, roleId: string): Promise<AdminRolesType | null> {
        const { roles_id, admin_user_id } = admiRole;
        await db.query('UPDATE Admin_user_Roles SET admin_user_id = UUID_TO_BIN(?), roles_id = UUID_TO_BIN(?) WHERE admin_user_id = UUID_TO_BIN(?) AND roles_id = UUID_TO_BIN(?)',
            {
                replacements: [adminUserId, roles_id, adminUserId, roleId],
            });
    
        const updatedAdmiRole = await AdminRolesModel.findAdmiRoleById(adminUserId);
        const updatedAdmiRoleAsAdmiRole = updatedAdmiRole as unknown as AdminRolesType;
        if (typeof updatedAdmiRoleAsAdmiRole !== 'object') { return null; }
        return updatedAdmiRoleAsAdmiRole;
    }

    static async updateAdminUser(Admin_User_Roles: Partial<AdminRolesType>, id: string): Promise<AdminRolesType | null> {
        try {
            const filteredFields: Partial<AdminRolesType> = {};
                for (const key in Admin_User_Roles) {
            if (Admin_User_Roles[key] !== undefined) {
                filteredFields[key] = Admin_User_Roles[key];
            }
        }

        const setClause = Object.keys(filteredFields).map(field => `${field} = ?`).join(', ');

        await db.query(`UPDATE Admin_User SET ${setClause} WHERE admin_user_id = UUID_TO_BIN(?)`,
            {
                replacements: [...Object.values(filteredFields), id],
            });

        return Admin_User_Roles as AdminRolesType;
        } catch (error) {
            console.error('Error updating admin user:', error);
            return null;
        }
    }
    
    static async eliminateAdmiRoleById(admiRole: AdminRolesType ): Promise<AdminRolesType | null> {
    
        const {  admin_user_id } = admiRole

        let eliminatedAdmiRole = 
        await db.query('DELETE FROM Admin_user_Roles WHERE admin_user_id = UUID_TO_BIN(?)',
            {
                replacements: [admin_user_id]
            })
        const eliminatedAdmiRoleAsAdmiRole = eliminatedAdmiRole as unknown as AdminRolesType;
        if (typeof eliminatedAdmiRoleAsAdmiRole !== 'object') { return null; }
        return eliminatedAdmiRoleAsAdmiRole;
    }
    }
    
    

export default AdminRolesModel;
