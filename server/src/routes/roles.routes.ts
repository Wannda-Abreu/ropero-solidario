import { Router } from 'express';
import { createRole, deleteRoleById, getRolebyId, getRoles, getRoleUsers, updateRole} from '../controllers/role.controller';


const router = Router(); 

router.get('/', getRoles);
router.get('/', getRolebyId)
router.post('/', createRole);
router.get('/adminUser/:id', getRoleUsers);
router.put('/:id', updateRole)
router.delete('/:id', deleteRoleById)

export default router