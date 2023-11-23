import { Request, Response } from 'express';
import RolesModel from '../models/roleModel';
import AdminUserRolesModel from '../models/adminUserRolesModel';


const getRoles = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await RolesModel.findAllRoles();

        if (!roles) {
            return res.status(404).json({ message: 'Roles not found' });
        }

        return res.status(200).json(roles);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const getRolebyId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roleId = req.params.id;
        const role = await RolesModel.findRolesById(roleId);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        return res.status(200).json(role);
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

const getRoleUsers = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const  rolesId  = req.params.id; 

        const roles = await RolesModel.findUsersByRoleId(rolesId);

    if (!roles) {
        return res.status(404).send('Roles no encontrados para el usuario');
    }

        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener roles del usuario');
    }
}

const createRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { roles_name } = req.body;

        if (!roles_name) {
            return res.status(400).json({ message: 'Invalid Request data. Role name is required.' });
        }

        const newRole = await RolesModel.createRoles({
            roles_name,
        });

        if (newRole) {
            console.log('Usuario creado:', newRole);
        }
        
        return res.status(201).json({ message: 'The Role has been created successfully!', newRole });
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};


const updateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roleId = req.params.id;
        const { roles_name } = req.body;

        if (!roles_name) {
            return res.status(400).json({ message: 'Invalid data. Role name is required.' });
        }

        const updatedRole = await RolesModel.updateRoles( roles_name , roleId);

        return res.status(200).json({ message: 'The role has been updated successfully!', updatedRole });
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }
};


const deleteRoleById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roleId = req.params.id;
        const eliminatedRole = await RolesModel.eliminateRolesById(roleId);

        if (!eliminatedRole) {
            return res.status(404).json({ message: 'Role Not Found' });
        }

        return res.status(200).json({ message: 'The Role has been Eliminated!', eliminatedRole });
    } catch (error: unknown) {
        return res.status(500).json({ message: (error as Error).message });
    }

    
};


export { getRoles, getRolebyId, createRole, updateRole, deleteRoleById, getRoleUsers };
    
