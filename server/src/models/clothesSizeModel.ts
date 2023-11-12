import { ClothesSize } from "../types/clothesSize";
import db from "../config/dbConfig.sequelize";

class ClothesSizeModel {
    static async findAll(): Promise<ClothesSize[] | null> {
      const [sizes, metadata] = await db.query('SELECT BIN_TO_UUID(clothes_sizes_id) AS clothes_sizes_id, size, cuantity FROM Clothes_Sizes;');
      return sizes as ClothesSize[];
    }
  
    static async findById(id: string): Promise<ClothesSize | null> {
      const [size, metadata] = await db.query(`SELECT BIN_TO_UUID(clothes_sizes_id) AS clothes_sizes_id, size, cuantity FROM Clothes_Sizes WHERE clothes_sizes_id = UUID_TO_BIN("${id}")`);
      return (size as ClothesSize[]).at(0) || null;
    }
  
    static async create(size: ClothesSize): Promise<ClothesSize | null> {
      const { size: sizeName, cuantity } = size;
      const [newSize, metadata] = await db.query(
        'INSERT INTO Clothes_Sizes (size, cuantity) VALUES (?, ?)',
        {
          replacements: [sizeName, cuantity],
        }
      );
  
      const newSizeAsClothesSize = newSize as unknown as ClothesSize;
      if (typeof newSizeAsClothesSize !== 'object') { return null; }
      return newSizeAsClothesSize;
    }
  
    static async update(size: ClothesSize, id: string): Promise<ClothesSize | null> {
      const { size: sizeName, cuantity } = size;
      await db.query('UPDATE Clothes_Sizes SET size = ?, cuantity = ? WHERE clothes_sizes_id = UUID_TO_BIN(?)',
        {
          replacements: [sizeName, cuantity, id],
        });
      const updatedSize = await ClothesSizeModel.findById(id);
      const updatedSizeAsClothesSize = updatedSize as unknown as ClothesSize;
      if (typeof updatedSizeAsClothesSize !== 'object') { return null; }
      return updatedSizeAsClothesSize;
    }
  
    static async eliminateById(id: string): Promise<ClothesSize | null> {
      let eliminatedSize = await ClothesSizeModel.findById(id);
      await db.query('DELETE FROM Clothes_Sizes WHERE clothes_sizes_id = UUID_TO_BIN(?)',
        {
          replacements: [id]
        });
      const eliminatedSizeAsClothesSize = eliminatedSize as unknown as ClothesSize;
      if (typeof eliminatedSizeAsClothesSize !== 'object') { return null; }
      return eliminatedSizeAsClothesSize;
    }
  }

  export default ClothesSizeModel;
  