import { Router } from 'express';
import { AdminUserController } from '../controllers/adminUser.controller';
import { authToken, isAdmin } from '../middlewares/auth';

export const adminRouter = Router();

const adminUserController = new AdminUserController();

adminRouter.post('/signup', adminUserController.signup);
adminRouter.post('/login', adminUserController.login);


adminRouter.get('/', authToken, isAdmin, adminUserController.getAll);
adminRouter.get('/:id', adminUserController.getById);
adminRouter.put('/:id', adminUserController.update);
adminRouter.get('/roles/:id', adminUserController.getUserRole);
adminRouter.delete('/:id', adminUserController.delete);