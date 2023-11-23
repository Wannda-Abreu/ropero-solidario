import { Router } from 'express';
import { getAllAdminUserRoles, updateAdminRole } from '../controllers/adminUserRoles.controller';

const AdminRolesRouter = Router(); 

AdminRolesRouter.get('/', getAllAdminUserRoles );
AdminRolesRouter.put('/', updateAdminRole )

export default AdminRolesRouter;