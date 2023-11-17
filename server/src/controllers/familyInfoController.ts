// import { Request, Response } from 'express';
// import FamilyInfoModel from '../model/familyInfoModel';
// import FamilyInfo from '../types/familyInfoTypes';

// const getFamiliesInfo = async (_req: Request, res: Response): Promise<Response> =>{
 
//     try {
//         const familiesInfo : FamilyInfo[]= await FamilyInfoModel.findAll();

//         if(!familiesInfo){return res.status(404).json({message:'FamiliesInfo not found'})};
//         return res.status(200).json(familiesInfo);

//     } catch (error: unknown) {
//         return res.status(500).json({message: (error as Error).message});
//     }
// }

// const getFamilyInfo = async (req: Request, res: Response): Promise<Response> =>{
//     try {
//         const familyInfoId = req.params.id;
//         const familyInfo : FamilyInfo = await FamilyInfoModel.findById(familyInfoId);

//         if(!familyInfo){return res.status(404).json({message:'FamilyInfo not Found'})}
//         return res.status(200).json(familyInfo);
//     } catch (error: unknown) {
//         return res.status(500).json({message:(error as Error).message});
//     }
// }

// const createFamilyInfo = async (req: Request, res: Response): Promise<Response> => {

//     try {
//         const {number_famly_members, underaged_family_members, overaged_family_members} = req.body;

//         if(!number_famly_members|| !underaged_family_members || !overaged_family_members){
//             return res.status(400).json({message: 'Invalid Request Data. All fields are requiered.'});   
//         }
//         await FamilyInfoModel.create(req.body);

//         return res.status(201).json({message:'The Family Info has been created successfully!'});
        
//     } catch (error: unknown) {
//         return res.json({message:(error as Error).message});
        
//     }
// }

// const updateFamilyInfo = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const {number_famly_members, underaged_members, overaged_members} = req.body;
//         if(!number_famly_members|| !underaged_members || overaged_members){
//             return res.status(400).json({message: 'Invalid Request Data. All fields are requiered.'});   
//         }
//         await FamilyInfoModel.create(req.body);

//         return res.status(201).json({message: 'The Family Info has been created succesfully!'});
        
//     } catch (error: unknown) {
//         return res.json({message:(error as Error).message});  
//     }
// }

// const deleteFamilyInfoById = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const familyInfoId = req.params.id;
//         const elimininatedFamilyInfo = await FamilyInfoModel.eliminateById(familyInfoId);

//         if(!elimininatedFamilyInfo){return res.status(404).json({message:'Family Info not Found'})};
//         return res.status(200).json({message:'The Family Info has been Eliminated!'});
        
//     } catch (error: unknown) {
//         return res.status(500).json({message:(error as Error).message})
//     }
// }

// export {getFamiliesInfo, getFamilyInfo, createFamilyInfo, updateFamilyInfo, deleteFamilyInfoById};