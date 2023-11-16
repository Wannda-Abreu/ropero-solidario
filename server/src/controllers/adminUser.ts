import { Request, Response } from 'express';
import { AdminUser } from '../models/adminUser';
import { generateToken } from '../utils/token';

export class AdminUserController {

  async signup(req: Request, res: Response) {
    try {
      const { admin_name, admin_surname, email, admin_password } = req.body;

      const adminUser = new AdminUser(admin_name, admin_surname/* , email, admin_password */);

      const result = await adminUser.save();

      const token = generateToken(result.admin_user_id);

      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el usuario administrador');
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, admin_password } = req.body;

      const adminUser = await AdminUser.findOne({ where: { email }});

      if (!adminUser) {
        return res.status(401).send('Credenciales inválidas');
      }

      const isMatch = await adminUser.comparePassword(admin_password);

      if (!isMatch) {
        return res.status(401).send('Credenciales inválidas');
      }

      const token = generateToken(adminUser.admin_user_id);

      res.cookie('jwtToken', token, {httpOnly: true})
      res.status(200).json({ token });
      
    } catch (error: unknown) {
      console.error(error);
      res.status(500).send({ message: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const adminUsers = await AdminUser.findAll();

      res.status(200).json(adminUsers);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).send({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const adminUser = await AdminUser.findByPk(id);

      if (!adminUser) {
        return res.status(404).send('Usuario administrador no encontrado');
      }

      res.status(200).json(adminUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el usuario administrador');
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { admin_name, admin_surname, email, admin_password } = req.body;

      const adminUser = await AdminUser.findByPk(id);

      if (!adminUser) {
        return res.status(404).send('Usuario administrador no encontrado');
      }

      adminUser.admin_name = admin_name || adminUser.admin_name;
      adminUser.admin_surname = admin_surname || adminUser.admin_surname;
      adminUser.email = email || adminUser.email;
      adminUser.admin_password = admin_password || adminUser.admin_password;

      const result = await adminUser.save();

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar el usuario administrador');
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const adminUser = await AdminUser.findByPk(id);

      if (!adminUser) {
        return res.status(404).send('Usuario administrador no encontrado');
      }

      await adminUser.destroy();

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el usuario administrador');
    }
  }
}
