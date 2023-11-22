import express from 'express';
import * as referenceCenterController from '../controllers/reference-center';

const referenceCenterRouter = express.Router();

referenceCenterRouter.get('/', referenceCenterController.getAllReferenceCenters);
referenceCenterRouter.get('/:id', referenceCenterController.getReferenceCenterById);
referenceCenterRouter.post('/', referenceCenterController.createReferenceCenter);
referenceCenterRouter.put('/:id', referenceCenterController.updateReferenceCenter);
referenceCenterRouter.delete('/:id', referenceCenterController.deleteReferenceCenter);

export default referenceCenterRouter;
