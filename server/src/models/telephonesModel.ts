import db from "../config/dbConfig.sequelize";
import TelephoneId from "../types/id-types/telephoneId";
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

    static async create(createTelephone: Telephone): Promise<TelephoneId | null> {
        const { telephone, user_id } = createTelephone;
        const [newTelephone, metadata] = await db.query(
            'INSERT INTO Telephones (telephone, user_id) VALUES (?, UUID_TO_BIN(?));',
            {
                replacements: [telephone, user_id || null],
            }
        );

        const [[telephoneId]] = await db.query('SELECT BIN_TO_UUID(telephone_id) AS telephone_id FROM Telephones ORDER BY telephone_id DESC LIMIT 1;');

        if (typeof  telephoneId !== 'object') {return null;}
          
        return  telephoneId as TelephoneId;
    }

    static async update(updateTelephone: Telephone, id: string): Promise<Telephone | null> {
        const { telephone, user_id } = updateTelephone;
        await db.query('UPDATE Telephones SET telephone = ?, user_id = UUID_TO_BIN(?) WHERE telephone_id = UUID_TO_BIN(?)',
            {
                replacements: [telephone, user_id || null, id],
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

    static async findByTelephone(telephone: string): Promise<Telephone[] | null> {
        const [telephones, metadata] = await db.query(`SELECT BIN_TO_UUID(telephone_id) AS telephone_id, telephone, BIN_TO_UUID(user_id) AS user_id FROM Telephones WHERE telephone = ?`,
        {
            replacements: [telephone]
        });
        return telephones as Telephone[];
    }

    static async eliminateByTelephone(telephone: string): Promise<Telephone | null> {
        let eliminatedTelephone = TelephoneModel.findByTelephone(telephone);
        await db.query('DELETE FROM Telephones WHERE telephone = ?)',
            {
                replacements: [telephone]
            })
        const eliminatedTelephoneAsTelephone = eliminatedTelephone as unknown as Telephone;
        if (typeof eliminatedTelephoneAsTelephone !== 'object') { return null; }
        return eliminatedTelephoneAsTelephone;
    }
}

export default TelephoneModel;