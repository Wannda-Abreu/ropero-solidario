import express from 'express';
import * as referenceCenterController from '../controllers/reference-center';

const router = express.Router();

router.get('/', referenceCenterController.getAllReferenceCenters);
router.get('/:id', referenceCenterController.getReferenceCenterById);
router.post('/', referenceCenterController.createReferenceCenter);
router.put('/:id', referenceCenterController.updateReferenceCenter);
router.delete('/:id', referenceCenterController.deleteReferenceCenter);

export default router;
