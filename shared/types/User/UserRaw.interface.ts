import {UserRole} from './userRole'

export interface UserRawInterface {
  id: string;
  telegramId: number;
  is_bot: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  role: UserRole;
  banned: boolean;
  phone: string;
}