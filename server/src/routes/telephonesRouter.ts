import { Router } from 'express';
import { getTelephones, getTelephone, createTelephone, updateTelephone, deleteTelephoneById } from '../controllers/telephonesController';

const telephoneRouter = Router();

telephoneRouter.get('/', getTelephones);
telephoneRouter.get('/:id', getTelephone);
telephoneRouter.post('/', createTelephone);
telephoneRouter.put('/:id', updateTelephone);
telephoneRouter.patch('/:id', updateTelephone);
telephoneRouter.delete('/:id', deleteTelephoneById);

export default telephoneRouter;