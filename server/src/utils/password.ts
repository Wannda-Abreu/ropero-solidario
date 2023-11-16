import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => bcrypt.hashSync(password, SALT_ROUNDS);
