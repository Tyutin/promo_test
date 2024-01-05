import { OrderEntityInterface } from '@shared/types/Order/front/OrderEntity.interface';
import './OrdersList.scss';
import OrderCard from './OrderCard/OrderCard';

type OrdersListProps = {
  orders: OrderEntityInterface[];
};

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <ul className="orders-list">
      {orders.map((order) => {
        return (
          <li className="orders-list__element" key={order.id}>
            <OrderCard order={order} />
          </li>
        );
      })}
    </ul>
  );
}
