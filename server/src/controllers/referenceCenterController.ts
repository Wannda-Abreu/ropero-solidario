import { Request, Response } from 'express';
import ReferenceCenterModel from '../models/referenceCenterModel';
import ReferenceCenter from '../types/referenceCenter';

const getReferenceCenters = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const centers = await ReferenceCenterModel.findAll();

    if (!centers) { return res.status(404).json({ message: 'Reference centers not found' }); }
    return res.status(200).json(centers);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

const getReferenceCenter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const centerId = req.params.id;
    const center = await ReferenceCenterModel.findById(centerId);

    if (!center) { return res.status(404).json({ message: 'Reference center not found' }); }
    return res.status(200).json(center);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

const createReferenceCenter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { reference_center } = req.body;

    if (!reference_center) {
      return res.status(400).json({ message: 'Invalid Request data. Reference center field is required.' });
    }

    const referenceCenterId = await ReferenceCenterModel.create(req.body);
    return res.status(201).json(referenceCenterId);

  } catch (error: unknown) {
    return res.json({ message: (error as Error).message });
  }
}

const updateReferenceCenter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { reference_center } = req.body;

    if (!reference_center) {
      return res.status(400).json({ message: 'Invalid data. Reference center field is required.' });
    }

    const centerId = req.params.id;
    await ReferenceCenterModel.update(req.body, centerId);
    return res.status(200).json({ message: 'The reference center has been updated successfully!' });

  } catch (error: unknown) {
    return res.json({ message: (error as Error).message });
  }
}

const deleteReferenceCenterById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const centerId = req.params.id;
    const eliminatedCenter = await ReferenceCenterModel.eliminateById(centerId);

    if (!eliminatedCenter) { return res.status(404).json({ message: 'Reference Center Not Found' }); }
    return res.status(200).json({ message: 'The Reference Center has been Eliminated!' });

  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export { getReferenceCenters, getReferenceCenter, createReferenceCenter, updateReferenceCenter, deleteReferenceCenterById };
