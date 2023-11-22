import { Router } from 'express';
import {getZipCodes, getZipCodesById, updateZipCode, createZipCode, deleteZipCode} from '../controllers/zipCodeController';

const zipCodeRouter = Router();

    zipCodeRouter.get('/', getZipCodes);
    zipCodeRouter.get('/:id', getZipCodesById);
    zipCodeRouter.post('/', createZipCode);
    zipCodeRouter.put('/:id', updateZipCode);
    zipCodeRouter.delete('/:id', deleteZipCode);


export default zipCodeRouter;