// import FamilyInfo from "../types/familyInfoTypes";
// import db from "../config/dbConfig.sequelize";

// class FamilyInfoModel {
     
//     static async findAll(): Promise<FamilyInfo[] | null> {

//         const [familiesInfo, metadata] = await db.query('SELECT BIN_TO_UUID(family_info_id) AS family_info_id, number_of_family_members, underaged_family_members, overaged_family_members FROM Family_info;');
//         return familiesInfo as FamilyInfo[];
//     }

//     static async findById(id: string): Promise<FamilyInfo | null>{
//         const [familyInfo, metadata] =  await db.query(``)
//     }

    


// }
