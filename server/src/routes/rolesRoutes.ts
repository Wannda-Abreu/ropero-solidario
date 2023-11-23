import { Router } from 'express';
import { createRole, deleteRoleById, getRolebyId, getRoles, getRoleUsers, updateRole} from '../controllers/role.controller';


const Rolesrouter = Router(); 

Rolesrouter.get('/', getRoles);
Rolesrouter.get('/', getRolebyId)
Rolesrouter.post('/', createRole);
Rolesrouter.get('/adminUser/:id', getRoleUsers);
Rolesrouter.put('/:id', updateRole)
Rolesrouter.delete('/:id', deleteRoleById)

export default Rolesrouter