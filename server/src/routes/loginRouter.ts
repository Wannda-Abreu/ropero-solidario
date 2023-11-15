import { Router } from "express";
import { getAllAdminUsers, createAdminUserHandler } from '../controllers/loginController';

const adminRouter = Router();

adminRouter.get('/adminUsers', getAllAdminUsers);
adminRouter.post('/adminUsers', createAdminUserHandler);

export default adminRouter;
