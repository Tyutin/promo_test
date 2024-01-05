import { fetchData } from '@fetch/fetchData';
import './OrdersPage.scss';
import OrdersList from '@profileComponents/OrdersList/OrdersList';

export default async function OrdersPage() {
  const ordersResponse = await fetchData.orders.getAllMyOrders();
  if (!ordersResponse || !ordersResponse.orders.length) {
    return (
      <div className="orders-page">
        <h1 className="profile-layout__title">Мои заказы</h1>
        <p>У Вас пока нет заказов</p>
      </div>
    );
  }
  return (
    <div className="orders-page">
      <h1 className="profile-layout__title">Мои заказы</h1>
      <OrdersList {...ordersResponse} />
    </div>
  );
}
