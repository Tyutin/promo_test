/* eslint-disable @next/next/no-img-element */

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import './AuthControl.scss';
import { Session } from 'next-auth';

export default function AuthControl(props: { session: Session | null }) {
  const { session } = props;
  if (!session) {
    return <button onClick={() => signIn('vk')}>Авторизация</button>;
  }
  return (
    <Link className="auth-link" href={'/профиль'}>
      <div className="auth-user-picture">
        <img
          src={session?.user?.image || ''}
          alt={session?.user?.name || ''}
          className="auth-user-picture"
        />
      </div>
    </Link>
  );
}
