'use server'
import {cookies} from 'next/headers'
import config from '../../../backend/dataSource/dataSource.config'
import { TypeORMAdapter } from './adapter/adapter'

const adapter = TypeORMAdapter(config)
const cookiesList = cookies()

export async function createAuthRequestAction() {
  const requestIdInCookies = cookiesList.get('authRequestId')?.value
  if (!!requestIdInCookies) {
    return requestIdInCookies
  }
  const authRequest = await adapter.createAuthRequest(cookiesList.get('promocode')?.value)
  cookiesList.set('authRequestId', authRequest.id, {maxAge: 86400})
  return authRequest.id
}