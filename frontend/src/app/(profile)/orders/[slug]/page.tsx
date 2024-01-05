import { fetchData } from '@fetch/fetchData';
import { redirect } from 'next/navigation';
import './OrderPage.scss';
import OrderNameForm from '@profileComponents/OrderNameForm/OrderNameForm';
import {
  OrderStatus,
  OrderStatusValues,
} from '@shared/types/Order/orderStatus';
import moment from 'moment';

export default async function OrderPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const orderResponse = await fetchData.orders.getMyOrder(slug);
  if (!orderResponse || !orderResponse.order) {
    redirect('/orders');
  }
  const { order } = orderResponse;
  return (
    <div className="order-page">
      <h1 className="profile-layout__title order-page__title">О заказе</h1>
      <header>
        {!!order.name && <h2>{order.name}</h2>}
        <span className="order-page__subtitle">{order.id}</span>
      </header>
      <div className="order-page__info">
        <p className="order-page__created-at">
          Заказ от: {moment(order.createdAt).format('DD.MM.YYYY')}
        </p>
        <p className="order-page__updated-at">
          Обновлено: {moment(order.updatedAt).format('DD.MM.YYYY')}
        </p>
        <p className="order-page__status">
          Статус: {OrderStatusValues[order.status]}
        </p>
        {!!order.cancelReason && (
          <p className="order-page__cancel-reason">
            Причина отмены: {order.cancelReason}
          </p>
        )}
        {!!order.currentLocation && (
          <p className="order-page__current-location">
            Текущее местоположение: {order.currentLocation}
          </p>
        )}
        <p className="order-page__stuff-price">
          Цена товаров: {order.productPrice}₽
        </p>
        <p className="order-page__service-price">
          Работа сервиса: {order.shippingPrice + order.serviceCommission}₽
        </p>
        <p className="order-page__order-paid">
          Заказ оплачен: {order.isPaidByClient ? 'Да' : 'Нет'}
        </p>
        {!!order.estimatedDeliveryTime && (
          <p className="order-page__estimated-date">
            Примерная дата выдачи:{' '}
            {moment(order.estimatedDeliveryTime).format('DD.MM.YYYY')}
          </p>
        )}
        {!!order.clientNotes && (
          <div className="order-page__order-description">
            <p className="order-page__order-description-title">Описание:</p>
            <div className="order-page__order-description-text">
              {order.clientNotes?.split('\n').map((el) => {
                return <p key={el}>{el}</p>;
              })}
            </div>
          </div>
        )}
        <OrderNameForm order={order} />
      </div>
    </div>
  );
}
