import AdminRolesModel from "../models/adminUserRolesModel";
import { Request, Response } from 'express';

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
