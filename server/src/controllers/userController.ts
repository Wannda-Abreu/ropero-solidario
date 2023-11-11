import {Request,Response} from 'express';
import UserModel from '../models/userModel';
import User from '../types/userTypes';

const getUsers = async (_req:Request, res : Response): Promise<Response> =>{
    try {       
        const users= await UserModel.findAll();

        if(!users){return res.status(404).json({message:'User not found'});}
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
        return res.status(200).json(user)
    } catch (error : unknown) {
        return res.status(500).json({message:(error as Error).message})
    }
}

const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {user_name, surname, user_password, nationality}= req.body;
        
        if(!user_name||!surname||!user_password||!nationality){
            return res.status(400).json({ message: 'Invalid data. All fields are required.'});
        }
        await UserModel.create(req.body)
        
        return res.status(201).json({message:'The User has been created successfully!'});
        
    } catch (error: unknown) {
        return res.json({message:(error as Error).message})
    }

}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.params.id;
        const updatedUser = await UserModel.update(req.body, userId);

        if(!updatedUser){return res.status(400).json({message:'Required User Data'})}
        return res.status(200).json({messge:'The user has been updated successfully!'})

    } catch (error : unknown) {
        return res.json({message:(error as Error).message})
    }
}

const deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.params.id;
        const eliminatedUser = await UserModel.eliminateById(userId); 

        if(!eliminatedUser){return res.status(404).json({message:'User Not Found'})}
        return res.json({message:'The User has been Eliminated!'})

    } catch (error: unknown) {
        return res.status(501).json({message:(error as Error).message})       
    }
}





//  

export {getUsers, getUser, createUser, updateUser, deleteUserById}