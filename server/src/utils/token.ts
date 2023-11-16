import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mysecret';

export const generateToken = (admin_user_id: string) => jwt.sign({ admin_user_id }, JWT_SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
