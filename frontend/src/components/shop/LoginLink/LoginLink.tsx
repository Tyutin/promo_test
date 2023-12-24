'use client';

import { useEffect, useState } from 'react';
import {
  createAuthRequestAction,
  loginByRequestId,
} from '../../../typeorm/actions';

export default function LoginLink({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
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
    <a onClick={startAuth} title={title}>
      {children}
    </a>
  );
}
