import { SessionOptions } from 'iron-session';
import { UserEntity } from '../../../backend/src/user/user.entity';
import { SESSION_COOKIE_NAME } from '@/constants/cookies';

export interface SessionData {
  isLoggedIn: boolean;
  sessionToken: string;
  user?: Partial<UserEntity>;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  sessionToken: ''
};

export const sessionOptions: SessionOptions = {
  password: 'XLNI4RGVdajwCiZ9Vn6Ey0ShpMAAtALl',
  cookieName: SESSION_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  },
};
