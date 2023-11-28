import { Router } from 'express';
import { getReferenceCenters, getReferenceCenter, createReferenceCenter, updateReferenceCenter, deleteReferenceCenterById} from '../controllers/referenceCenterController'; 

const referenceCenterRouter = Router();

referenceCenterRouter.get('/', getReferenceCenters);
referenceCenterRouter.get('/:id', getReferenceCenter);
referenceCenterRouter.post('/', createReferenceCenter);
referenceCenterRouter.put('/:id', updateReferenceCenter);
referenceCenterRouter.patch('/:id', updateReferenceCenter);
referenceCenterRouter.delete('/:id', deleteReferenceCenterById);

export default referenceCenterRouter;