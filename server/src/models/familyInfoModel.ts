import FamilyInfo from "../types/familyInfoTypes";
import db from "../config/dbConfig.sequelize";

class FamilyInfoModel {
     
    static async findAll(): Promise<FamilyInfo[] | null> {

        const [familiesInfo, metadata] = await db.query('SELECT BIN_TO_UUID(family_info_id) AS family_info_id, number_of_family_members, underaged_family_members, overaged_family_members FROM Family_info;');
        return familiesInfo as FamilyInfo[];
    }

    static async findById(id: string): Promise<FamilyInfo | null>{
        const [familyInfo, metadata] =  await db.query(`SELECT BIN_TO_UUID(family_info_id) AS family_info_id, number_of_family_members, overaged_family_members, underaged_family_members FROM Family_Info WHERE family_info_id = UUID_TO_BIN("${id}");`)
        return (familyInfo as FamilyInfo[]).at(0) || null;
    }
    
    static async create(familyInfo: FamilyInfo): Promise<FamilyInfo | null> {
        const { number_of_family_members, underaged_family_members, overaged_family_members} = familyInfo;
        const [newFamilyInfo, metadata] = await db.query(
            'INSERT INTO Family_info (number_of_family_members, underaged_family_members, overaged_family_members) VALUES (?,?,?);',
        
            {
                replacements:
                [number_of_family_members, underaged_family_members, overaged_family_members],
            }
        );
    
        const newFamilyInfoAsFamilyInfo = newFamilyInfo as unknown as FamilyInfo;
        if (typeof  newFamilyInfoAsFamilyInfo !== 'object') {return null;}
        return  newFamilyInfoAsFamilyInfo;
        
    }

    static async update(familyInfo: FamilyInfo, id: string): Promise<FamilyInfo | null>{

        const { number_of_family_members, underaged_family_members, overaged_family_members} = familyInfo;
        await db.query('UPDATE Family_Info SET number_of_family_members = ?, underaged_family_members = ?, overaged_family_members = ? WHERE family_info_id = UUID_TO_BIN(?)',
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
        let eliminatedFamilyInfo = FamilyInfoModel.findById(id);
        await db.query('DELETE FROM Family_Info WHERE family_info_id = UUID_TO_BIN(?)',
        {
            replacements: [id]
        })
        const eliminatedFamilyInfoAsFamilyInfo = eliminatedFamilyInfo as unknown as FamilyInfo;
        if(typeof eliminatedFamilyInfoAsFamilyInfo !== 'object'){return null};
        return eliminatedFamilyInfoAsFamilyInfo;
    }
   
    static async findByNumberOfMembers(numberOfMembers: number): Promise<FamilyInfo[] | null> {
        const [familyMembers, metadata] = await db.query(`SELECT BIN_TO_BIN(family_info_id) AS family_info_id, number_of_family_members, underaged_family_members, overaged_family_members WHERE number_of_family_members = ${numberOfMembers}`);
        return familyMembers as FamilyInfo[];
    }

    static async eliminateByNumberOfMembers(numberOfMembers: number): Promise< FamilyInfo | null>{
        let eliminatedFamilyInfo = FamilyInfoModel.findByNumberOfMembers(numberOfMembers);
        await db.query('DELETE FROM Family_Info WHERE number_of_family_members = ?', 
        {
            replacements: [numberOfMembers]
        })
        const eliminatedFamilyInfoAsFamilyInfo = eliminatedFamilyInfo as unknown as FamilyInfo;
        if(typeof eliminatedFamilyInfoAsFamilyInfo !== 'object'){return null};
        return eliminatedFamilyInfoAsFamilyInfo;

    }
    


}

export default FamilyInfoModel;