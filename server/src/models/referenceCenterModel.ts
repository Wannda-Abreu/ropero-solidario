import ReferenceCenter from '../types/referenceCenter'
import db from "../config/dbConfig.sequelize";

class ReferenceCenterModel {
  static async findAll(): Promise<ReferenceCenter[] | null> {
    const [centers, metadata] = await db.query('SELECT BIN_TO_UUID(reference_center_id) AS reference_center_id, reference_center FROM Reference_centers;');
    return centers as ReferenceCenter[];
  }

  static async findById(id: string): Promise<ReferenceCenter | null> {
    const [center, metadata] = await db.query(`SELECT BIN_TO_UUID(reference_center_id) AS reference_center_id, reference_center FROM Reference_centers WHERE reference_center_id = UUID_TO_BIN("${id}")`);
    return (center as ReferenceCenter[]).at(0) || null;
  }

  static async create(center: ReferenceCenter): Promise<Object | null> {
    const { reference_center } = center;
    const [newCenter, metadata] = await db.query(
      'INSERT INTO Reference_centers (reference_center) VALUES (?);',
      {
        replacements: [reference_center],
      }
    );

    const [referenceCenterId] = await db.query('SELECT BIN_TO_UUID(reference_center_id) AS reference_center_id FROM Reference_centers ORDER BY reference_center_id DESC LIMIT 1;');

    if (typeof referenceCenterId !== 'object') {return null;}
      
    return referenceCenterId;
  }

  static async update(center: ReferenceCenter, id: string): Promise<ReferenceCenter | null> {
    const { reference_center } = center;
    await db.query('UPDATE Reference_centers SET reference_center = ? WHERE reference_center_id = UUID_TO_BIN(?)',
      {
        replacements: [reference_center, id],
      });
    const updatedCenter = await ReferenceCenterModel.findById(id);
    const updatedCenterAsReferenceCenter = updatedCenter as unknown as ReferenceCenter;
    if (typeof updatedCenterAsReferenceCenter !== 'object') { return null; }
    return updatedCenterAsReferenceCenter;
  }

  static async eliminateById(id: string): Promise<ReferenceCenter | null> {
    let eliminatedCenter = ReferenceCenterModel.findById(id);
    await db.query('DELETE FROM Reference_centers WHERE reference_center_id = UUID_TO_BIN(?)',
      {
        replacements: [id],
      });
    const eliminatedCenterAsReferenceCenter = eliminatedCenter as unknown as ReferenceCenter;
    if (typeof eliminatedCenterAsReferenceCenter !== 'object') { return null; }
    return eliminatedCenterAsReferenceCenter;
  }
}

export default ReferenceCenterModel;