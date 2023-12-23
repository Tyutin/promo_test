import './ShopPage.scss';
import { getSession } from '../../typeorm/getSession';

export default async function Home() {
  const session = await getSession();
  return (
    <div className="shop-page">
      О нас
      <br />
      {JSON.stringify(session.isLoggedIn)}
    </div>
  );
}
