import { DataTypes } from "sequelize";
import db from "../config/dbConfig.sequelize";
import Admin_UserT from "../types/AdminUserTypes";
import { AdminUserRoles } from "./adminUserRolesModel";
import rolesTypes from "../types/rolesTypes";
import { Roles } from "./roleModel";

export const Admin_User = db.define(
    'Admin_User',
    {
      admin_user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        
      },
      admin_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      admin_surname: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      admin_password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      tableName: 'Admin_User',
      timestamps: false,
      freezeTableName: true
    }
);

  Admin_User.belongsToMany(Roles, { through: 'Admin_user_Roles', foreignKey: 'admin_user_id' });
  Roles.belongsToMany(Admin_User, { through: 'Admin_user_Roles', foreignKey: 'admin_user_id' });
  AdminUserRoles.hasMany(Roles, { as: 'roles', foreignKey: 'roles_user_id' });
  AdminUserRoles.hasMany(Admin_User, { as: 'users', foreignKey: 'admin_user_id' });
  



  

class AdminUserModel {
    
  
    static async findAllAdminUsers(): Promise<Admin_UserT[] | null> {
        const [Admin_User, metadata] = await db.query('SELECT BIN_TO_UUID(admin_user_id) AS admin_user_id, admin_name, admin_surname, email, admin_password FROM Admin_User;');
        return Admin_User as Admin_UserT[];
    }

    static async findAdminUserByEmail(email: string): Promise<Admin_UserT | null> {
      const [Admin_User, metadata] = await db.query(
          'SELECT BIN_TO_UUID(admin_user_id) AS admin_user_id, admin_name, admin_surname, email, admin_password FROM Admin_User WHERE email = ?',
          {
              replacements: [email],
          }
      );
      return (Admin_User as Admin_UserT[])[0] || null;
  }

    static async findAdminUserById(id: string | undefined ): Promise<Admin_UserT | null> {
        const [Admin_User, metadata] = await db.query(`SELECT BIN_TO_UUID(admin_user_id) AS admin_user_id, admin_name, admin_surname, email, admin_password FROM Admin_User WHERE admin_user_id = UUID_TO_BIN("${id}")`);
        return (Admin_User as Admin_UserT[]).at(0) || null;
    }

    static async findRolesByUserId(userId: string | undefined): Promise<rolesTypes[] | null> {
      try {
        const roles = await db.query(
          'SELECT BIN_TO_UUID(r.roles_id) as roles_id, r.roles_name FROM Roles r INNER JOIN Admin_user_Roles aur ON r.roles_id = aur.roles_id WHERE aur.admin_user_id = UUID_TO_BIN(?)',
          {
            replacements: [userId],
          }
        );
    
        return roles[0] as unknown as rolesTypes[] ;
      } catch (error) {
        console.error('Error al obtener roles por usuario:', error);
        return null;
      }
    }

    
    static async createAdminUser(Admin_User: Admin_UserT): Promise<Admin_UserT | null> {
      try {
        const { admin_name, admin_surname, email, admin_password } = Admin_User;
    
        const insertResult = await db.query(
          'INSERT INTO Admin_User (admin_name, admin_surname, email, admin_password) VALUES (?, ?, ?, ?);',
          {
            replacements: [admin_name, admin_surname, email, admin_password]
          }
        );
    
        const newAdminIdResult = await db.query(
          'SELECT BIN_TO_UUID(admin_user_id) as admin_user_id FROM Admin_User WHERE email = ?;',
          {
            replacements: [email]
          }
        ) as { admin_user_id: string }[][];
    
        const adminIds = newAdminIdResult.map(result => result[0]?.admin_user_id);
    
        if (!adminIds || adminIds.length === 0) {
          console.error('No se pudo obtener el ID del nuevo administrador.');
          return null;
        }
    
        return { admin_user_id: adminIds[0] } as unknown as Admin_UserT;
    
      } catch (error) {
        console.error('Error creating admin user:', error);
        return null;
      }
    }
  

    static async updateAdminUser(Admin_User: Partial<Admin_UserT>, id: string): Promise<Admin_UserT | null> {
      try {


          const filteredFields: Partial<Admin_UserT> = {};
          for (const key in Admin_User) {
              if (Admin_User[key] !== undefined) {
                  filteredFields[key] = Admin_User[key];
              }
          }
  
          const setClause = Object.keys(filteredFields).map(field => `${field} = ?`).join(', ');
  
          
          await db.query(`UPDATE Admin_User SET ${setClause} WHERE admin_user_id = UUID_TO_BIN(?)`,
              {
                  replacements: [...Object.values(filteredFields), id],
              });
  
          
          return Admin_User as Admin_UserT;
      } catch (error) {
          console.error('Error updating admin user:', error);
          return null;
      }
  }
  
    static async eliminateAdmin_UserById(id: string): Promise<Admin_UserT | null> {
        let eliminatedAdmin_User = AdminUserModel.findAdminUserById(id);
        await db.query('DELETE FROM Admin_User WHERE admin_user_id = UUID_TO_BIN(?)',
            {
                replacements: [id]
            })
        const eliminatedAdmin_UserAsAdmin_User = eliminatedAdmin_User as unknown as Admin_UserT;
        if (typeof eliminatedAdmin_UserAsAdmin_User !== 'object') { return null; }
        return eliminatedAdmin_UserAsAdmin_User;
    }
}

export default AdminUserModel;




