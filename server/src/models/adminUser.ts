import { Model, DataTypes } from 'sequelize';
import { hashPassword } from '../utils/password';
import db from '../config/dbConfig.sequelize';

export class AdminUser extends Model {
  public admin_user_id!: string;
  public admin_name!: string;
  public admin_surname!: string;
  public email!: string;
  public admin_password!: string;


  public async comparePassword(password: string): Promise<boolean> {
    return password === this.admin_password;
  }
}

AdminUser.init(
  {
    admin_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    admin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    admin_password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const hashedPassword = hashPassword(value);
        this.setDataValue('admin_password', hashedPassword);
      },
    },
  },
  {
    sequelize: db,
    tableName: 'Admin_User', 
    timestamps: false
  }
);

export default AdminUser;
