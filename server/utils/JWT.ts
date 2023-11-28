import jwt from 'jsonwebtoken'

type jwtInfo = {
  admin_user_id?: string | undefined;
}

const secretKey = 'clave'

export const createToken = (payload: jwtInfo): string => {
  return jwt.sign(payload, secretKey, {expiresIn: '1h'})
}

export const verifyToken = (token: string): jwtInfo | undefined => {
  try {
    const decodedToken = jwt.verify(token, secretKey) as jwtInfo
    return decodedToken
  } catch (err) {
    console.log('Error al verificar el token', err);
  }
}