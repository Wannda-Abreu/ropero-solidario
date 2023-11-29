import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string | Buffer ) => {
  let hashed= bcrypt.hashSync(password, SALT_ROUNDS);
  return hashed
}

export const comparePassword = (password: string, hashedPassword: string): boolean => {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  };