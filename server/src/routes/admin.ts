import { Router } from 'express';
import { AdminUserController } from '../controllers/adminUser';
import { authMiddleware } from '../middlewares/auth';

export const adminRouter = Router();

const adminUserController = new AdminUserController();

adminRouter.post('/signup', adminUserController.signup);
adminRouter.post('/login', adminUserController.login);

adminRouter.use(authMiddleware);

adminRouter.get('/', adminUserController.getAll);
adminRouter.get('/:id', adminUserController.getById);
adminRouter.put('/:id', adminUserController.update);
adminRouter.delete('/:id', adminUserController.delete);
