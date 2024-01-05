'use client';
import Button from '@commonComponents/Button/Button';
import { updateMyProductAction } from '@fetch/actions';
import { UpdateMyOrderDtoInterface } from '@shared/types/Order/UpdateMyOrder.dto';
import { OrderEntityInterface } from '@shared/types/Order/front/OrderEntity.interface';
import { Form, Input } from 'antd';
import { useState } from 'react';
import './OrderNameForm.scss';

type OrderNameFormProps = {
  order: OrderEntityInterface;
};

export default function OrderNameForm({ order }: OrderNameFormProps) {
  const [isFetching, setIsFetching] = useState(false);
  const onFinish = async (values: UpdateMyOrderDtoInterface) => {
    setIsFetching(true);
    await updateMyProductAction(order.id, values);
    setIsFetching(false);
  };
  return (
    <Form
      name="OrderNameForm"
      onFinish={onFinish}
      disabled={isFetching}
      layout="vertical"
      className="order-name-form"
    >
      <Form.Item
        label="Имя заказа"
        name="name"
        initialValue={order.name}
        className="order-name-form__label"
        style={{ flexGrow: '1' }}
      >
        <Input type="text" maxLength={20} style={{ maxWidth: '300px' }} />
      </Form.Item>
      <Form.Item>
        <Button
          theme="orange"
          type="submit"
          additionalClasses="order-name-form__submit"
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
