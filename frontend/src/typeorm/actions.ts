'use server'
import {cookies} from 'next/headers'
import config from '../../../backend/dataSource/dataSource.config'
import { TypeORMAdapter } from './adapter/adapter'

const adapter = TypeORMAdapter(config)

export async function createAuthRequestAction() {
  const cookiesList = cookies()
  const requestIdInCookies = cookiesList.get('authRequestId')?.value
  if (!!requestIdInCookies) {
    console.log(`requestIdInCookies = ${requestIdInCookies}`)
    return requestIdInCookies
  }
  const authRequest = await adapter.createAuthRequest(cookiesList.get('promocode')?.value)
  cookiesList.set('authRequestId', authRequest.id, {maxAge: 86400})
  console.log(`authRequest.id = ${authRequest.id}`)
  return authRequest.id
}