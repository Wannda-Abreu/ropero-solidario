import { Router } from 'express';
import {getZipCodes/* , getZipCode */} from '../controllers/zipCodeController';

const zipCodeRouter = Router();

zipCodeRouter.get('/', getZipCodes)
// zipCodeRouter.get('/:id', getZipCode)

export default zipCodeRouter;