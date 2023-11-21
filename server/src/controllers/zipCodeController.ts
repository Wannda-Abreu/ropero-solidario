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
    };

const getZipCodesById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
      
    try {
    const zipCode = await ZipCodeModel.findById(id);
      
       /*if (!zipCode) {*/
       if (ZipCodeModel.length === 0){
        return res.status(404).json({ message: 'ZipCode not found' });
        }
      
        return res.status(200).json(zipCode);
        } 
        catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
        }
    };

const createZipCode = async (req: Request, res: Response): Promise<Response> => {
    const zipCodeData: ZipCode = req.body;
      
    try {
        const newZipCode = await ZipCodeModel.create(zipCodeData);
      
        if (!newZipCode) {
        return res.status(500).json({ message: 'Failed to create ZipCode' });
        }
      
        return res.status(201).json(newZipCode);
        } 
        catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
        }
      };

const updateZipCode = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const updatedZipCodeData: ZipCode = req.body;
      
    try {
        const updatedZipCode = await ZipCodeModel.update(updatedZipCodeData, id);
      
        if (!updatedZipCode) {
        return res.status(404).json({ message: 'ZipCode not found' });
        }
      
        return res.status(200).json(updatedZipCode);
        } 
        catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
        }
    };

const deleteZipCode = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
      
    try {
        const deletedZipCode = await ZipCodeModel.deleteById(id);
      
        if (!deletedZipCode) {
        return res.status(404).json({ message: 'ZipCode not found' });
        }
      
        return res.status(200).json(deletedZipCode);
        } 
        catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
        }
      };
      
}
export {getZipCodes,
        getZipCodesById,
        createZipCode,
        updateZipCode,
        deleteZipCode,
};