import React from 'react';
import { getSession } from '../../../typeorm/getSession';
import LoginButton from './LoginButton/LoginButton';
import LogoutButton from './LogoutButton/LogoutButton';

export default async function AuthControl() {
  const session = await getSession();
  if (session.isLoggedIn) {
    return <LogoutButton />;
  }
  return <LoginButton />;
}
