'use server'
import {cookies} from 'next/headers'
import config from '../../../backend/dataSource/dataSource.config'
import { TypeORMAdapter } from './adapter/adapter'
import { getSession } from './getSession'
import { revalidatePath } from 'next/cache'

const adapter = TypeORMAdapter(config)

export async function createAuthRequestAction() {
  const cookiesList = cookies()
  const requestIdInCookies = cookiesList.get('authRequestId')?.value
  if (!!requestIdInCookies) {
    return requestIdInCookies
  }
  const authRequest = await adapter.createAuthRequest(cookiesList.get('promocode')?.value)
  cookiesList.set('authRequestId', authRequest.id, {
    maxAge: 86400,
    httpOnly: true,
    sameSite: 'strict',
    // secure: true TODO: проверка на https
  })
  return authRequest.id
}

export async function loginByRequestId(authRequestId:string): Promise<boolean> {
  const userAndSession = await adapter.getUserAndSessionByAuthRequestId(authRequestId)
  if(!userAndSession) return false
  const {user, session: dbSession} = userAndSession
  const session = await getSession();
  session.sessionToken = dbSession.sessionToken
  session.isLoggedIn = true;
  await session.save();
  revalidatePath('/');
  return true
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  revalidatePath('/session');
}