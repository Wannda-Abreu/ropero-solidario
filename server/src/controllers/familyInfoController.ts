import { Request, Response } from 'express';
import FamilyInfoModel from '../models/familyInfoModel';
import FamilyInfo from '../types/familyInfoTypes';

const getFamiliesInfo = async (_req: Request, res: Response): Promise<Response> =>{
 
    try {
        const familiesInfo = await FamilyInfoModel.findAll();

        if(!familiesInfo){return res.status(404).json({message:'FamiliesInfo not found'})};
        return res.status(200).json(familiesInfo);

    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message});
    }
}

const getFamilyInfo = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const familyInfoId = req.params.id;
        const familyInfo = await FamilyInfoModel.findById(familyInfoId);

        if(!familyInfo){return res.status(404).json({message:'Family Info not Found'})}
        return res.status(200).json(familyInfo);
    } catch (error: unknown) {
        return res.status(500).json({message:(error as Error).message});
    }
}

const createFamilyInfo = async (req: Request, res: Response): Promise<Response> => {

    try {
        const {number_of_family_members, underaged_family_members, overaged_family_members} = req.body;

        if(!number_of_family_members|| !underaged_family_members || !overaged_family_members){
            return res.status(400).json({message: 'Invalid Request Data. All fields are required.'});   
        }
        
        const familyInfo = await FamilyInfoModel.create(req.body);
        if(typeof familyInfo !== 'object'){return res.status(404).json({message: 'Invalid Request Data. All fields are required.'}); }
        return res.status(201).json(familyInfo);
        
    } catch (error: unknown) {
        return res.json({message:(error as Error).message});
        
    }
}

const updateFamilyInfo = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const {number_of_family_members, underaged_family_members, overaged_family_members} = req.body;
        if(!number_of_family_members|| !underaged_family_members || !overaged_family_members){
            return res.status(400).json({message: 'Invalid Request Data. All fields are required.'});   
        }
        const familyInfoIdId = req.params.id;
        await FamilyInfoModel.update(req.body, familyInfoIdId);

        return res.status(200).json({message: 'The Family Info has been created succesfully!'});
        
    } catch (error: unknown) {
        return res.json({message:(error as Error).message});  
    }
}

const deleteFamilyInfoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const familyInfoId = req.params.id;
        const elimininatedFamilyInfo = await FamilyInfoModel.findById(familyInfoId);

        if(!elimininatedFamilyInfo){return res.status(404).json({message:'Family Info not Found'})};
        await FamilyInfoModel.eliminateById(familyInfoId);
        return res.status(200).json({message:'The Family Info has been Eliminated!'});
        
    } catch (error: unknown) {
        return res.status(500).json({message:(error as Error).message})
    }
}

export {getFamiliesInfo, getFamilyInfo, createFamilyInfo, updateFamilyInfo, deleteFamilyInfoById};