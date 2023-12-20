'use client';

import { createAuthRequestAction } from '../../../typeorm/actions';

export default function AuthButton() {
  async function startAuth() {
    const authRequestId = await createAuthRequestAction();
    const tgLink = `https://t.me/promo_delivery_test_bot?start=${authRequestId}`;
    window.open(tgLink, '_blank');
  }
  return <button onClick={startAuth}>GET REQUEST ID</button>;
}
