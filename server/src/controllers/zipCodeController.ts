import { Request, Response } from "express";
import ZipCodeModel from '../models/zipCodeModel';
import ZipCode from "../types/zipCodeTypes";

const getZipCodes = async (_req: Request, res: Response): Promise<Response> => {
    try {
         const zipCodes = await ZipCodeModel.findAll();

        if(!zipCodes){return res.status(404).json({message:'ZipCode not found'})}
        return res.status(200).json(zipCodes);
    } catch (error: unknown) {
        return res.status(500).json({message:(error as Error).message})
    }
    
}
export {getZipCodes};