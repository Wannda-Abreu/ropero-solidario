import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../config/dbConfig.sequelize';


class Telephone extends Model {
  public telephone_id!: string;
  public telephone!: string;
  public user_id!: string;
}

Telephone.init(
  {
    telephone_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(16),
    },
  },
  {
    sequelize: db,
    tableName: 'Telephones',
    modelName: 'Telephone',
    timestamps: false,
  }
);

export const getAllTelephones = async () => {
  const telephones = await Telephone.findAll();
  return telephones;
};

export const getTelephoneById = async (id: string) => {
  const telephone = await Telephone.findByPk(id);
  return telephone;
};

export const createTelephone = async (telephone: string, userId: string) => {
  const newTelephone = await Telephone.create({ telephone });
  return newTelephone.telephone_id;
};

export const updateTelephone = async (id: string, telephone: string, userId: string) => {
  const existingTelephone = await Telephone.findByPk(id);
  if (existingTelephone) {
    await existingTelephone.update({ telephone, user_id: userId });
  }
};

export const deleteTelephone = async (id: string) => {
  const existingTelephone = await Telephone.findByPk(id);
  if (existingTelephone) {
    await existingTelephone.destroy();
  }
};
