import { Request, Response } from 'express';
import * as referenceCenterModel from '../models/reference-center';

export const getAllReferenceCenters = async (_req: Request, res: Response) => {
  try {
    const reference_center = await referenceCenterModel.getAllReferenceCenters();
    res.json(reference_center);
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
 
};

export const getReferenceCenterById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reference_center = await referenceCenterModel.getReferenceCenterById(id);
    res.status(200).json(reference_center);
  } catch (error: any) {
    res.status(500).json({ message: error.message } )
  }
  
};

export const createReferenceCenter = async (req: Request, res: Response) => {
  const { reference_center } = req.body;
  try {
    const new_reference_center_id = await referenceCenterModel.createReferenceCenter(reference_center);
    res.status(201).json({ id: new_reference_center_id });  
  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
  
};

export const updateReferenceCenter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reference_center, user_id } = req.body;
  try {
    await referenceCenterModel.updateReferenceCenter(id, reference_center, user_id);
    res.status(201).json({ message: 'Reference Center updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
} 
  
};

export const deleteReferenceCenter = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await referenceCenterModel.deleteReferenceCenter(id);
    res.status(200).json({ message: 'Reference Center deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  
};
