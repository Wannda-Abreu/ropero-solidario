import { Request, Response } from 'express';
import * as telephoneModel from '../models/telephones';

export const getAllTelephones = async (_req: Request, res: Response) => {
  try {
    const telephones = await telephoneModel.getAllTelephones();
    res.json(telephones);
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
 
};

export const getTelephoneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const telephone = await telephoneModel.getTelephoneById(id);
    res.status(200).json(telephone);
  } catch (error: any) {
    res.status(500).json({ message: error.message } )
  }
  
};

export const createTelephone = async (req: Request, res: Response) => {
  const { telephone, user_id } = req.body;
  try {
    const newTelephoneId = await telephoneModel.createTelephone(telephone, user_id);
    res.json({ id: newTelephoneId });  
  } catch (error: any) {
    res.status(500).json({ message: error.message})
  }
  
};

export const updateTelephone = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { telephone, user_id } = req.body;
  try {
    await telephoneModel.updateTelephone(id, telephone, user_id);
    res.status(201).json({ message: 'Telephone updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
} 
  
};

export const deleteTelephone = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await telephoneModel.deleteTelephone(id);
    res.status(200).json({ message: 'Telephone deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  
};
