import { getSession } from '@/typeorm/getSession';
import LogoutButton from '@profileComponents/LogoutButton/LogoutButton';

export default async function page() {
  const session = await getSession();
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <LogoutButton />
      </div>
    </div>
  );
}
