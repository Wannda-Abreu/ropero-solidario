import { Router } from 'express';
import {getZipCodes/* , getZipCode */} from '../controllers/zipCodeController';

const zipCodeRouter = Router();

zipCodeRouter.get('/', getZipCodes)

export default zipCodeRouter;