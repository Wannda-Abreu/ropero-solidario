import { Router } from 'express';
import {
  createTelephone,
  deleteTelephone,
  getTelephoneById,
  getTelephones,
  updateTelephone,
} from '../controllers/telephones';

const telephoneRouter = Router();

telephoneRouter.post('/telephones', createTelephone);
telephoneRouter.get('/telephones', getTelephones);
telephoneRouter.get('/telephones/:id', getTelephoneById);
telephoneRouter.put('/telephones/:id', updateTelephone);
telephoneRouter.delete('/telephones/:id', deleteTelephone);

export default telephoneRouter;
