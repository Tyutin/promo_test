import { SessionOptions } from 'iron-session';
import { UserEntity } from '../../../backend/src/user/user.entity';

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
  cookieName: 'is_session',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    // TODO: проверка на https
    secure: false,
  },
};
