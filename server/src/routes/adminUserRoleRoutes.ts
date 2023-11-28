import { Router } from 'express';
import { getAllAdminUserRoles, translateToken, updateAdminRole } from '../controllers/adminUserRoles.controller';

const AdminRolesRouter = Router(); 

AdminRolesRouter.get('/', getAllAdminUserRoles );
AdminRolesRouter.put('/', updateAdminRole )
AdminRolesRouter.post('/token', translateToken )

export default AdminRolesRouter;