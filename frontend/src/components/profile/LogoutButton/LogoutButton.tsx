'use client';

import Button from '@commonComponents/Button/Button';

import './LogoutButton.scss';
import { logout } from '@/typeorm/actions';

export default function LogoutButton() {
  return (
    <Button
      theme="rose"
      onClick={() => {
        logout();
      }}
      additionalClasses="login-button"
    >
      ВЫХОД
    </Button>
  );
}
