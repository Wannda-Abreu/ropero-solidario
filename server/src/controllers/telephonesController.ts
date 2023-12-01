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

const findByTelephone =  async (req: Request, res: Response): Promise<Response>  =>{
    try {
    const { telephone } = req.body; // Suponiendo que el número de teléfono está en los parámetros de la solicitud

    const userByTelephone = await TelephoneModel.findByTelephone(telephone);

    if (userByTelephone) {

        return res.status(200).json( userByTelephone );
    } else {
        
        return res.status(200).json(userByTelephone);
    }
    } catch (error) {

        console.error('Error in findByTelephone controller:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createTelephone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { telephone, user_id } = req.body;

        if (!telephone) {
            return res.status(400).json({ message: 'Invalid Request data. Both telephone and user_id are required.' });
        }
        await TelephoneModel.create(req.body);

        return res.status(201).json({ message: 'The Telephone has been created successfully!' });

    } catch (error: unknown) {
        return res.json({ message: (error as Error).message });
    }

}

const updateTelephone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { telephone} = req.body;
        if (!telephone) {
            return res.status(400).json({ message: 'Invalid data. Both telephone and user_id are required.' });
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
        const eliminatedTelephone = await TelephoneModel.eliminateById(telephoneId);

        if (!eliminatedTelephone) { return res.status(404).json({ message: 'Telephone Not Found' }) }
        return res.status(200).json({ message: 'The Telephone has been Eliminated!' })

    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export { getTelephones, getTelephone, createTelephone, updateTelephone, deleteTelephoneById, findByTelephone }
