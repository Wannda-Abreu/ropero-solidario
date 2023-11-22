import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../config/dbConfig.sequelize';


class ReferenceCenter extends Model {
  public reference_center_id!: string;
  public reference_center!: string;
}

ReferenceCenter.init(
  {
    reference_center_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    reference_center: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Reference_centers',
    modelName: 'Reference_center',
    timestamps: false,
  }
);

export const getAllReferenceCenters = async () => {
  const reference_center = await ReferenceCenter.findAll();
  return reference_center;
};

export const getReferenceCenterById = async (id: string) => {
  const reference_center = await ReferenceCenter.findByPk(id);
  return reference_center;
};

export const createReferenceCenter = async (reference_center: string) => {
  const newReference_center = await ReferenceCenter.create({ reference_center });
  return newReference_center.reference_center_id;
};

export const updateReferenceCenter = async (id: string, telephone: string, userId: string) => {
  const existingReference_center = await ReferenceCenter.findByPk(id);
  if (existingReference_center) {
    await existingReference_center.update({ telephone, user_id: userId });
  }
};

export const deleteReferenceCenter = async (id: string) => {
  const existingReference_center = await ReferenceCenter.findByPk(id);
  if (existingReference_center) {
    await existingReference_center.destroy();
  }
};
