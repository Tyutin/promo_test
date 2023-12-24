'use client';

import { useEffect, useState } from 'react';
import {
  createAuthRequestAction,
  loginByRequestId,
} from '../../../typeorm/actions';
import Button from '@commonComponents/Button/Button';

import './LoginButton.scss';

export default function LoginButton() {
  const [authRequestId, setAuthRequestId] = useState<string>('');

  useEffect(() => {
    let pollingInterval: ReturnType<typeof setTimeout>;
    if (authRequestId) {
      pollingInterval = setInterval(async () => {
        const isUserSet = await loginByRequestId(authRequestId);
        if (isUserSet) {
          clearInterval(pollingInterval);
        }
      }, 5000);
    }
    return () => {
      clearInterval(pollingInterval);
    };
  }, [authRequestId]);

  async function startAuth() {
    const authReqId = await createAuthRequestAction();
    setAuthRequestId(authReqId);
    const tgLink = `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_AUTH_BOT_NAME}?start=${authReqId}`;
    window.open(tgLink, '_blank');
  }
  return (
    <Button theme="rose" onClick={startAuth} additionalClasses="login-button">
      ВХОД
    </Button>
  );
}
