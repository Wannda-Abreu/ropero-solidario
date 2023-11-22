import express from 'express';
import * as telephoneController from '../controllers/telephones';

const telephoneRouter = express.Router();

telephoneRouter.get('/', telephoneController.getAllTelephones);
telephoneRouter.get('/:id', telephoneController.getTelephoneById);
telephoneRouter.post('/', telephoneController.createTelephone);
telephoneRouter.put('/:id', telephoneController.updateTelephone);
telephoneRouter.delete('/:id', telephoneController.deleteTelephone);

export default telephoneRouter;
