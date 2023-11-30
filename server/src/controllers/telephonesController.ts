import { Request, Response } from 'express';
import TelephoneModel from '../models/telephonesModel';


const getTelephones = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const telephones = await TelephoneModel.findAll();

        if (!telephones) {
            return res.status(404).json({ message: 'Telephones not found' });
        }
        return res.status(200).json(telephones);

    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

const getTelephone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const telephoneId = req.params.id;
        const telephone = await TelephoneModel.findById(telephoneId);

        if (!telephone) {
            return res.status(404).json({ message: 'Telephone not found' })
        }
        return res.status(200).json(telephone);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

const createTelephone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { telephone, user_id } = req.body;

        if (!telephone) {
            return res.status(400).json({ message: 'Invalid Request Data. All fields are required.' });
        }
        const telephoneId = await TelephoneModel.create(req.body);

        return res.status(201).json(telephoneId);

    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }

}

const updateTelephone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { telephone, user_id } = req.body;
        if (!telephone) {
            return res.status(400).json({ message: 'Invalid Request Data. All fields are required.'});
        }

        const telephoneId = req.params.id;
        await TelephoneModel.update(req.body, telephoneId);
        return res.status(200).json({ message: 'The telephone has been updated successfully!' })

    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }
}

const deleteTelephoneById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const telephoneId = req.params.id;
        const eliminatedTelephone = await TelephoneModel.findById(telephoneId);

        if (!eliminatedTelephone) { return res.status(404).json({ message: 'Telephone Not Found' }) }
        await TelephoneModel.eliminateById(telephoneId);
        return res.status(200).json({ message: 'The Telephone has been Eliminated!' })

    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export { getTelephones, getTelephone, createTelephone, updateTelephone, deleteTelephoneById }
