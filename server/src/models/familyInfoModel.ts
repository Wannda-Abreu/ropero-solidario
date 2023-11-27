import FamilyInfo from "../types/familyInfoTypes";
import db from "../config/dbConfig.sequelize";
import FamilyInfoId from "../types/id-types/familyInfoId";

class FamilyInfoModel {
     
    static async findAll(): Promise<FamilyInfo[] | null> {

        const [familiesInfo, metadata] = await db.query('SELECT BIN_TO_UUID(family_info_id) AS family_info_id, number_of_family_members, underaged_family_members, overaged_family_members FROM Families_info;');
        return familiesInfo as FamilyInfo[];
    }

    static async findById(id: string): Promise<FamilyInfo | null>{
        const [familyInfo, metadata] =  await db.query('SELECT BIN_TO_UUID(family_info_id) AS family_info_id, number_of_family_members, overaged_family_members, underaged_family_members FROM Families_Info WHERE family_info_id = UUID_TO_BIN(?);',
        {
            replacements: [id]
        })
        return (familyInfo as FamilyInfo[]).at(0) || null;
    }
    
    static async create(familyInfo: FamilyInfo): Promise<FamilyInfoId | null> {
        const { number_of_family_members, underaged_family_members, overaged_family_members} = familyInfo;
        const [newFamilyInfo, metadata] = await db.query(
            'INSERT INTO Families_info (number_of_family_members, underaged_family_members, overaged_family_members) VALUES (?,?,?);',
        
            {
                replacements:
                [number_of_family_members, underaged_family_members, overaged_family_members],
            }
        );
        const [[familyInfoId]] = await db.query('SELECT BIN_TO_UUID(family_info_id) AS family_info_id FROM Families_info ORDER BY family_info_id DESC LIMIT 1;');

        if (typeof  familyInfoId !== 'object') {return null;}
        
        return  familyInfoId as FamilyInfoId;
        
    }

    static async update(familyInfo: FamilyInfo, id: string): Promise<FamilyInfo | null>{

        const { number_of_family_members, underaged_family_members, overaged_family_members} = familyInfo;
        await db.query('UPDATE Families_Info SET number_of_family_members = ?, underaged_family_members = ?, overaged_family_members = ? WHERE family_info_id = UUID_TO_BIN(?)',
        {
            replacements:
            [number_of_family_members, underaged_family_members, overaged_family_members, id]
        });
        const updatedFamilyInfo = await FamilyInfoModel.findById(id);
        const updatedFamilyInfoAsFamilyInfo = updatedFamilyInfo as unknown as FamilyInfo
        if(typeof updatedFamilyInfoAsFamilyInfo !== 'object'){return null};
        return updatedFamilyInfo;
    }

    static async eliminateById(id: string): Promise<FamilyInfo | null> {
        let eliminatedFamilyInfo = await FamilyInfoModel.findById(id);
        const eliminatedFamilyInfoAsFamilyInfo = eliminatedFamilyInfo as unknown as FamilyInfo;
        if(typeof eliminatedFamilyInfoAsFamilyInfo !== 'object'){return null};
        await db.query('DELETE FROM Families_Info WHERE family_info_id = UUID_TO_BIN(?)',
        {
            replacements: [id]
        })
        
        return eliminatedFamilyInfoAsFamilyInfo;
    }
   
    static async findByNumberOfMembers(numberOfMembers: number): Promise<FamilyInfo[] | null> {
        const [familyMembers, metadata] = await db.query(`SELECT BIN_TO_UUID(family_info_id) AS family_info_id, number_of_family_members, underaged_family_members, overaged_family_members FROM Families_info WHERE number_of_family_members = ?;`,
        {
            replacements: [numberOfMembers]
        });
        return familyMembers as FamilyInfo[];
    }

    static async eliminateByNumberOfMembers(numberOfMembers: number): Promise< FamilyInfo | null>{
        let eliminatedFamilyInfo = await FamilyInfoModel.findByNumberOfMembers(numberOfMembers);
        await db.query('DELETE FROM Families_Info WHERE number_of_family_members = ?', 
        {
            replacements: [numberOfMembers]
        })
        const eliminatedFamilyInfoAsFamilyInfo = eliminatedFamilyInfo as unknown as FamilyInfo;
        if(typeof eliminatedFamilyInfoAsFamilyInfo !== 'object'){return null};
        return eliminatedFamilyInfoAsFamilyInfo;

    }
    


}

export default FamilyInfoModel;