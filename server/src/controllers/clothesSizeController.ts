import { Request, Response } from 'express';
import ClothesSizeModel from '../models/clothesSizeModel';

const getClothesSizes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const clothesSizes = await ClothesSizeModel.findAll();

        if (!clothesSizes) {
            return res.status(404).json({ message: 'Clothes sizes not found' });
        }

        return res.status(200).json(clothesSizes);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const getClothesSize = async (req: Request, res: Response): Promise<Response> => {
    try {
        const clothesSizeId = req.params.id;
        const clothesSize = await ClothesSizeModel.findById(clothesSizeId);

        if (!clothesSize) {
            return res.status(404).json({ message: 'Clothes size not found' });
        }

        return res.status(200).json(clothesSize);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const createClothesSize = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { size, category} = req.body;

        if (!size || !category) {
            return res.status(400).json({ message: 'Invalid data. All fields are required.' });
        }

        await ClothesSizeModel.create(req.body);

        return res.status(201).json({ message: 'The clothes size has been created successfully!' });
    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }
};

const updateClothesSize = async (req: Request, res: Response): Promise<Response> => {
    try {

    const {clothes_size,cuantity}= req.body;
    if (!clothes_size|| !cuantity) {
        return res.status(400).json({ message: 'Required clothes size data' });
    };
    
    const clothesSizeId = req.params.id;
    await ClothesSizeModel.update(req.body, clothesSizeId);
    return res.status(200).json({ message: 'The clothes size has been updated successfully!' });

    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }
};

const deleteClothesSizeById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const clothesSizeId = req.params.id;
        const eliminatedClothesSize = await ClothesSizeModel.eliminateById(clothesSizeId);

        if (!eliminatedClothesSize) {
            return res.status(404).json({ message: 'Clothes size not found' });
        }

        return res.json({ message: 'The clothes size has been eliminated!' });
    } catch (error: unknown) {
        return res.status(501).json({ message: (error as Error).message });
    }
};

export { getClothesSizes, getClothesSize, createClothesSize, updateClothesSize, deleteClothesSizeById};