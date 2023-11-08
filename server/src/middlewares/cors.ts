import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:1234/',
  'http://localhost:3000/',
  'http://localhost:5056/'
]
const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin: string, callback: (err: Error | null, origin?: null | Boolean | undefined) => void) => {

    if (!acceptedOrigins.includes(origin)) { return callback(null, true) }
    if (!origin) { return callback(null, true) }

      return callback(new Error('No allowed by CORDS'))
  }
})