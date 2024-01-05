import moment from 'moment';
import { OrderEntityInterface } from '@shared/types/Order/front/OrderEntity.interface';
import './OrderCard.scss';
import { OrderStatusValues } from '@shared/types/Order/orderStatus';
import Link from 'next/link';

type OrderCardProps = {
  order: OrderEntityInterface;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/orders/${order.id}`} className="order-card">
      <div className="order-card__header">
        <span className="order-card__id">{order.id}</span>
      </div>
      <div className="order-card__info">
        {!!order.name && <p className="order-card__name">{order.name}</p>}
        <p className="order-card__status">
          Статус: {OrderStatusValues[order.status]}
        </p>
        <p className="order-card__created">
          Заказ от {moment(order.createdAt).format('DD.MM.YYYY')}
        </p>
      </div>
    </Link>
  );
}
