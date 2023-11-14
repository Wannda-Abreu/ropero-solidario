import { Router } from "express";
import { getPhones } from '../controllers/phoneControllers';

const phoneRouter = Router();
phoneRouter.get('/', getPhones)

export default phoneRouter