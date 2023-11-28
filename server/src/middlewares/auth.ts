import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/JWT';
import AdminUserModel from '../models/adminUserModel';
import UserModel from '../models/userModel';
import AdminRolesModel from '../models/adminUserRolesModel';



export const authToken = async (req: Request, res: Response, next: NextFunction) => {
try {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).send('No se proporcionó un token de autenticación');
    }

    const decodedToken: any = verifyToken(token);
    console.log(decodedToken)

    if (!decodedToken || !decodedToken.id) {
      const userId = decodedToken.admin_user_id;
      await AdminUserModel.findAdminUserById(userId)
    }
    next();
  } catch (error: unknown) {
    console.error(error);
    res.status(401).send({ message: (error as Error).message });
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
      let token = req.cookies.token || req.headers.authorization;

      const decodedToken = verifyToken(token);

      console.log(decodedToken);


      if(!decodedToken){
        res.status(403).json({ error: 'Acceso denegado' });
      }

      let userId = decodedToken?.admin_user_id;

      const user = await AdminUserModel.findAdminUserById(userId)

      if (!user) {
          return res.status(403).json({ error: 'Acceso denegado' });
      }

      const roles = await AdminUserModel.findRolesByUserId(userId)

      console.log(roles)
      if (!roles) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }

      if ( roles[0]?.roles_name === 'Admin') {
        next();
      } else {
          res.status(403).json({ error: 'Acceso denegado' });
      }
  } catch (error) {
      res.status(500).json({ error: (error as Error).message });
  }
};