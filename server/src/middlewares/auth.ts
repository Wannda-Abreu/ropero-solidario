import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/JWT';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
try {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).send('No se proporcionó un token de autenticación');
    }

    const decodedToken: any = verifyToken(token);
    console.log(decodedToken)
    if (!decodedToken || !decodedToken.id) {
      const userId = decodedToken.admin_user_id;
      await AdminUser.findOne({ where: { admin_user_id: userId } })
    }
    next();
  } catch (error: unknown) {
    console.error(error);
    res.status(401).send({ message: (error as Error).message });
  }
};