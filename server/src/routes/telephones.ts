import express from 'express';
import * as telephoneController from '../controllers/telephones';

const router = express.Router();

router.get('/', telephoneController.getAllTelephones);
router.get('/:id', telephoneController.getTelephoneById);
router.post('/', telephoneController.createTelephone);
router.put('/:id', telephoneController.updateTelephone);
router.delete('/:id', telephoneController.deleteTelephone);

export default router;
