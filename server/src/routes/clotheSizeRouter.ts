import { Router } from "express";
import {getClothesSizes, getClothesSize, createClothesSize, updateClothesSize,deleteClothesSizeById} from '../controllers/clothesSizeController';

const clothesSizeRouter = Router();

clothesSizeRouter.get('/', getClothesSizes);
clothesSizeRouter.get('/:id', getClothesSize);
clothesSizeRouter.post('/', createClothesSize);
clothesSizeRouter.put('/:id', updateClothesSize);
clothesSizeRouter.patch('/:id', updateClothesSize);
clothesSizeRouter.delete('/:id', deleteClothesSizeById);

export default clothesSizeRouter;