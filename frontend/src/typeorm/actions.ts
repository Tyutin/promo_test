'use server'
import {cookies} from 'next/headers'
import config from '../../../backend/dataSource/dataSource.config'
import { TypeORMAdapter } from './adapter/adapter'

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

export async function setUserToSession(authRequestId:string): Promise<boolean> {
  const userAndSession = await adapter.getUserAndSessionByAuthRequestId(authRequestId)
  if(!userAndSession) return false
  const cookiesList = cookies()
  const {user, session} = userAndSession
  cookiesList.set('sessionToken', session.sessionToken, {
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date(session.expires).getTime()
    // secure: true TODO: проверка на https
  })
  return true
}