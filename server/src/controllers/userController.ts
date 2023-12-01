import {Request,Response} from 'express';
import UserModel from '../models/userModel';
import { validateUser } from '../schemas/user';
import User from '../types/userTypes';

const getUsers = async (_req: Request, res: Response): Promise<Response> =>{
    try {       
        const users = await UserModel.findAll();

        if(!users){return res.status(404).json({message:'Users not found'})};
        return res.status(200).json(users)

    } catch (error : unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
       
        if(!user){return res.status(404).json({message:'User not found'})}
        return res.status(200).json(user);
    } catch (error : unknown) {
        return res.status(500).json({message:(error as Error).message});
    }
}

const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        
        
        const userId = await UserModel.create(req.body);
        
        return res.status(201).json(userId);
        
    } catch (error: unknown) {
        return res.json({message:(error as Error).message});
    }

}

const updateUser = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const {
            user_name,
            surname,
            nationality,
            user_status,
            date_of_last_report_id,
            family_members_id,
            zip_code_id,
            reference_center_id,
            appointment_id,
        } = req.body;

        if (!id) {
            return res.status(400).send('ID no proporcionado');
        }

        const updatedFields: Partial<User> = {
            user_name,
            surname,
            nationality,
            user_status,
            date_of_last_report_id,
            family_members_id,
            zip_code_id,
            reference_center_id,
            appointment_id,
        } as User;

        const user = await UserModel.update(updatedFields, id);

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

    return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al actualizar el usuario');
    }
}



const deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.params.id;
        const eliminatedUser = await UserModel.eliminateById(userId); 

        if(!eliminatedUser){return res.status(404).json({message:'User Not Found'})}
        return res.status(200).json({message:'The User has been Eliminated!'})

    } catch (error: unknown) {
        return res.status(500).json({message:(error as Error).message})       
    }
}

export {getUsers, getUser, createUser, updateUser, deleteUserById}