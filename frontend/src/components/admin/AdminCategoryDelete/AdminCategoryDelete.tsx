'use client';

import { DeleteOutlined } from '@ant-design/icons';
import { deleteCategoryAction } from '@fetch/actions';
import { CategoryEntityInterface } from '@shared/types/Category/front/CategoryEntity.interface';
import { useCityStore } from '@store/city/useCityStore';
import { Alert, Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminCategoryDelete(props: {
  category: CategoryEntityInterface;
}) {
  const { category } = props;
  const productIds = category.products.map((el) => el.id);
  const [error, setError] = useState<Error>();
  const router = useRouter();
  const storeDeleteProduct = useCityStore((state) => state.storeDeleteProduct);
  const storeUpdateCity = useCityStore.setState;
  return (
    <>
      {error && (
        <>
          <Alert
            message={error.message}
            description={JSON.stringify(error, null, 2)}
            type="error"
            showIcon={true}
          />
          <br />
        </>
      )}
      <Button
        size="large"
        danger={true}
        icon={<DeleteOutlined />}
        type="primary"
        onClick={() => {
          Modal.confirm({
            title: 'Вы уверены что хотите удалить категорию и все её товары?',
            content: 'Это действие нельзя будет отменить',
            okText: 'Удалить',
            cancelText: 'Отмена',
            onOk() {
              return new Promise<void>((resolve) => {
                deleteCategoryAction({ id: category.id }).then((response) => {
                  if (response.message) {
                    setError(response);
                  } else {
                    storeDeleteProduct(productIds);
                    storeUpdateCity({ city: response.city });
                    setTimeout(() => {
                      router.push('/admin/categories/');
                    }, 0);
                  }
                  resolve();
                });
              });
            },
          });
        }}
      >
        Удалить категорию и все её товары
      </Button>
    </>
  );
}
