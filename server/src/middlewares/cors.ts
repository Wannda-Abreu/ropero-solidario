import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:1234/',
  'http://localhost:3000/',
  'http://localhost:5056/'
]
const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin: string | undefined, callback: (err: Error | null, origin?: string | boolean) => void) => {
    if (!acceptedOrigins.includes(origin as string)) {
      callback(new Error('Not allowed by CORS'));
    } else {
      callback(null, origin);
    }
  }
});

export default corsMiddleware;