import './ShopPage.scss';
import { getSession } from '../../typeorm/getSession';
import AuthControl from '@shopComponents/AuthControl/AuthControl';

export default async function Home() {
  const session2 = await getSession();
  return (
    <div className="shop-page">
      {JSON.stringify(session2)}
      sas
      <AuthControl />
    </div>
  );
}
