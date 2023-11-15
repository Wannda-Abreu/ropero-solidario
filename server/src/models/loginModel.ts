import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { openConnectionDB } from "../config/db-ropero-solidario";

import { v4 as uuidv4 } from 'uuid';
import { BinaryLike } from 'node:crypto';

export interface AdminUser {
  admin_user_id: BinaryLike;
  admin_name: string;
  admin_surname: string;
  email: string;
  admin_password: string;
}

export const createAdminUser = (admin_name: string, admin_surname: string, email: string, admin_password: string): AdminUser => {
  return {
    admin_user_id: uuidv4(),
    admin_name,
    admin_surname,
    email,
    admin_password,
  };
};