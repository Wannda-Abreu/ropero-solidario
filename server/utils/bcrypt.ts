import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => bcrypt.hashSync(password, SALT_ROUNDS);

export const comparePassword = (password: string, hashedPassword: string): boolean => {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  };