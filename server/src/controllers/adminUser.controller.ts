import { Request, Response } from 'express';

import { createToken } from '../../utils/JWT';
import AdminUserModel from '../models/adminUserModel';
import AdminRolesModel from '../models/adminUserRolesModel';
import Admin_UserT from '../types/AdminUserTypes';
import { comparePassword, hashPassword } from '../../utils/bcrypt';







export class AdminUserController {


  async signup(req: Request, res: Response): Promise<Response> {
    try {
        const { roles_id, admin_name, admin_surname, email, admin_password } = req.body;

        // Hashear la contraseña antes de almacenarla
        

        // Crear el administrador con la contraseña hasheada
        const createdAdminUser = await AdminUserModel.createAdminUser({
            admin_name,
            admin_surname,
            email,
            admin_password
        });

        if (!createdAdminUser) {
            console.error('Resultado del mapeo en el controlador:', createdAdminUser);
            return res.status(201).json(createdAdminUser);
        }

        const id = createdAdminUser.admin_user_id;
        console.log(id)
     
        const adminUser = await AdminRolesModel.createAdminRole({ admin_user_id: id, roles_id });

        return res.json("usuario registrado exitosamente");

    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({ message: (error as Error).message });
    }
}

async login(req: Request, res: Response) {
  try {
    const { email, admin_password } = req.body;

    const adminUser = await AdminUserModel.findAdminUserByEmail( email );

    if (!adminUser) {
      return res.status(401).send('Credenciales inválidas');
    }
    

    res.status(200).json(adminUser)

  } catch (error: unknown) {
    console.error(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


  async getAll(req: Request, res: Response) {
    try {
      const adminUsers = await AdminUserModel.findAllAdminUsers();

      res.status(200).json(adminUsers);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).send({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const adminUser = await AdminUserModel.findAdminUserById(id);

      if (!adminUser) {
        return res.status(404).send('Usuario administrador no encontrado');
      }

      res.status(200).json(adminUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el usuario administrador');
    }
  }


  async getUserRole(req: Request, res: Response): Promise<Response | any>  {
    try {
      const  userId  = req.params.id; 

      const roles = await AdminUserModel.findRolesByUserId(userId);

      if (!roles) {
        return res.status(404).send('Roles no encontrados para el usuario');
      }

      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener roles del usuario');
    }
  }
  

  async update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { admin_name, admin_surname, email, admin_password } = req.body;

        
        const updatedFields: Partial<Admin_UserT> = {
            admin_name,
            admin_surname,
            email,
            admin_password,
        };

        
        const filteredFields = Object.fromEntries(
            Object.entries(updatedFields).filter(([_, value]) => value !== undefined)
        );

        const adminUser = await AdminUserModel.updateAdminUser(filteredFields, id);

        if (!adminUser) {
            return res.status(404).send('Usuario administrador no encontrado');
        }

        res.status(200).json(adminUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario administrador');
    }
}


  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const adminUser = await AdminUserModel.eliminateAdmin_UserById(id);


      if (!adminUser) {
        return res.status(404).send('Usuario administrador no encontrado');
      }

      res.status(204).send("User Deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el usuario administrador');
    }
  }
}