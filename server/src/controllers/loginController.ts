import { Request, Response } from 'express'
import { createAdminUser, AdminUser } from '../models/loginModel';

const adminUsers: AdminUser[] = [];

export const getAllAdminUsers = (_req: Request, res: Response) => {
  res.json(adminUsers);
};

export const createAdminUserHandler = (req: Request, res: Response) => {
  const { adminName, adminSurname, email, adminPassword } = req.body;

  const newAdminUser = createAdminUser(adminName, adminSurname, email, adminPassword);
  adminUsers.push(newAdminUser);

  res.json(newAdminUser);
};
