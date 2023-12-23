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
      console.log('isPolling');
      pollingInterval = setInterval(async () => {
        console.log('interval');
        const isUserSet = await loginByRequestId(authRequestId);
        console.log(isUserSet);
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
    const tgLink = `https://t.me/promo_delivery_test_bot?start=${authReqId}`;
    window.open(tgLink, '_blank');
  }
  return (
    <Button theme="rose" onClick={startAuth} additionalClasses="login-button">
      ВХОД
    </Button>
  );
}
