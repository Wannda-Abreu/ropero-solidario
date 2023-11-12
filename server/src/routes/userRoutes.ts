import { Router } from 'express';
import {getUsers, getUser, createUser, updateUser,deleteUserById} from '../controllers/userController'


const userRouter =  Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUserById);

export default userRouter;

