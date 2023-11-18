import { RowDataPacket } from 'mysql2';

interface Telephone extends RowDataPacket {
  telephone_id: string;
  telephone: string;
  user_id: string;
}

export default Telephone;
