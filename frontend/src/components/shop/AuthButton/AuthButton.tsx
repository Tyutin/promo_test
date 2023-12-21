'use client';

import { useEffect, useState } from 'react';
import {
  createAuthRequestAction,
  setUserToSession,
} from '../../../typeorm/actions';

export default function AuthButton() {
  const [authRequestId, setAuthRequestId] = useState<string>('');

  useEffect(() => {
    let pollingInterval: ReturnType<typeof setTimeout>;
    if (authRequestId) {
      console.log('isPolling');
      pollingInterval = setInterval(async () => {
        console.log('interval');
        const isUserSet = await setUserToSession(authRequestId);
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
    const tgLink = `https://t.me/promo_delivery_test_bot?start=${authReqId}`;
    window.open(tgLink, '_blank');
    setAuthRequestId(authReqId);
  }
  return <button onClick={startAuth}>GET REQUEST ID{authRequestId}</button>;
}
