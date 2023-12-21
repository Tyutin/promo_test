'use client';

import { logout } from '../../../../typeorm/actions';

export default function LogoutButton() {
  async function clickHandler() {
    await logout();
  }
  return <button onClick={clickHandler}>LogOut</button>;
}
