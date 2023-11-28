import AdminRolesModel from "../models/adminUserRolesModel";
import { Request, Response } from 'express';
import AdminUserRolesType from "../types/adminUserRolesTypes";
import { verifyToken } from "../../utils/JWT";

export const getAllAdminUserRoles = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await AdminRolesModel.findAllAdmiRole();

        if (!roles) {
            return res.status(404).json({ message: 'Roles not found' });
        }

        return res.status(200).json(roles);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const updateAdminRole= async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { admin_user_id, roles_id } = req.body;

        
        const updatedFields: Partial<AdminUserRolesType> = {
            admin_user_id,
            roles_id
        };

        
        const filteredFields = Object.fromEntries(
            Object.entries(updatedFields).filter(([_, value]) => value !== undefined)
        );

        const adminUser = await AdminRolesModel.updateAdminRoles(filteredFields, id);

        if (!adminUser) {
            return res.status(404).send('Usuario administrador no encontrado');
        }

        res.status(200).json(adminUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario administrador');
    }
}


export const translateToken = (req: Request, res: Response): any => {
    const{ token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token no proporcionado en la solicitud.' });
    }

    let decoded = verifyToken(token)

    if(!decoded){
        return res.status(400).json({ error: 'No se ha decodificado el token' });
    }

    return res.status(200).json(decoded.admin_user_id)
    }
