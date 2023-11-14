import { Request, Response } from "express";
import phoneModel from '../models/phoneModel.ts';
import phoneTypes from '../types/phoneTypes.ts'

export const getPhones = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const phones = await phoneModel.findAll();
    if (!phones) { return res.status(404).json({ message: 'Phone not found' }) }
    return res.status(201).json(phones);
  } catch (err: unknown) { 
      return res.status(500).json({message:(error as Error).message})
  }
}
