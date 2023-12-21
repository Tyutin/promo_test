import { TypeORMAdapter } from './adapter/adapter';
import { SessionData } from './lib';
import { defaultSession, sessionOptions } from './lib';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import config from '../../../backend/dataSource/dataSource.config'

const adapter = TypeORMAdapter(config)

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.sessionToken = defaultSession.sessionToken;
    return session;
  }

  const user = await adapter.getUserBySessionToken(session.sessionToken)
  if(user) {
    session.user = user
  }

  return session;
}

