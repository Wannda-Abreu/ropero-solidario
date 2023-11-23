import { Router } from 'express';
import { getAllAdminUserRoles } from '../controllers/adminUserRoles.controller';

const router = Router(); 

router.get('/', getAllAdminUserRoles );
router.put('/', )

export default router;