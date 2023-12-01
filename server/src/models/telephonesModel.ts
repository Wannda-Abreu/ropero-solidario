import db from "../config/dbConfig.sequelize";
import Telephone from "../types/telephone";

class TelephoneModel {

    static async findAll(): Promise<Telephone[] | null> {
        const [telephones, metadata] = await db.query('SELECT BIN_TO_UUID(telephone_id) AS telephone_id, telephone, BIN_TO_UUID(user_id) AS user_id FROM Telephones;');
        return telephones as Telephone[];
    }

    static async findById(id: string): Promise<Telephone | null> {
        const [telephone, metadata] = await db.query(`SELECT BIN_TO_UUID(telephone_id) AS telephone_id, telephone, BIN_TO_UUID(user_id) AS user_id FROM Telephones WHERE telephone_id = UUID_TO_BIN("${id}")`);
        return (telephone as Telephone[]).at(0) || null;
    }

    static async findByTelephone(telephone: string): Promise<Telephone | null> {
        try {
            const [telephones, metadata] = await db.query(`
                SELECT
                    BIN_TO_UUID(telephone_id) AS telephone_id,
                    telephone,
                    BIN_TO_UUID(user_id) AS user_id
                    FROM Telephones
                WHERE telephone = ?;
        `, {
            replacements: [telephone],
        });

            if (telephones && telephones.length > 0) {
                return telephones[0] as Telephone;
        } else {
            return null;
        }
        } catch (error) {
            console.error('Error in findByTelephone:', error);
            throw error;
        }
      }

    static async create(createTelephone: Telephone): Promise<Telephone | null> {
        const { telephone, user_id } = createTelephone;
        const [newTelephone, metadata] = await db.query(
            'INSERT INTO Telephones (telephone, user_id) VALUES (?, UUID_TO_BIN(?));',
            {
                replacements: [telephone, user_id || null],
            }
        );

        const newTelephoneAsTelephone = newTelephone as unknown as Telephone;
        if (typeof newTelephoneAsTelephone !== 'object') { return null; }
        return newTelephoneAsTelephone;
    }

    static async update(updateTelephone: Telephone, id: string): Promise<Telephone | null> {
        const { telephone} = updateTelephone;
        await db.query('UPDATE Telephones SET telephone = ? WHERE telephone_id = UUID_TO_BIN(?)',
            {
                replacements: [telephone, id],
            });
        const updatedTelephone = await TelephoneModel.findById(id);
        const updatedTelephoneAsTelephone = updatedTelephone as unknown as Telephone;
        if (typeof updatedTelephoneAsTelephone !== 'object') { return null; }
        return updatedTelephoneAsTelephone;
    }

    static async eliminateById(id: string): Promise<Telephone | null> {
        let eliminatedTelephone = TelephoneModel.findById(id);
        await db.query('DELETE FROM Telephones WHERE telephone_id = UUID_TO_BIN(?)',
            {
                replacements: [id]
            })
        const eliminatedTelephoneAsTelephone = eliminatedTelephone as unknown as Telephone;
        if (typeof eliminatedTelephoneAsTelephone !== 'object') { return null; }
        return eliminatedTelephoneAsTelephone;
    }

    static async findByUserId(userId: string): Promise<Telephone[] | null> {
        const [telephones, metadata] = await db.query(`SELECT BIN_TO_UUID(telephone_id) AS telephone_id, telephone, BIN_TO_UUID(user_id) AS user_id FROM Telephones WHERE user_id = UUID_TO_BIN("${userId}")`);
        return telephones as Telephone[];
    }

    static async eliminateByUserId(userId: string): Promise<Telephone | null> {
        let eliminatedTelephone = TelephoneModel.findByUserId(userId);
        await db.query('DELETE FROM Telephones WHERE user_id = UUID_TO_BIN(?)',
            {
                replacements: [userId]
            })
        const eliminatedTelephoneAsTelephone = eliminatedTelephone as unknown as Telephone;
        if (typeof eliminatedTelephoneAsTelephone !== 'object') { return null; }
        return eliminatedTelephoneAsTelephone;
    }
}

export default TelephoneModel;