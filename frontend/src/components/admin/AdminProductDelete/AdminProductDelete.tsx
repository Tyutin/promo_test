'use client';

import { DeleteOutlined } from '@ant-design/icons';
import { deleteProductAction } from '@fetch/actions';
import { useCityStore } from '@store/city/useCityStore';
import { Alert, Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminProductDelete(props: { productId: number }) {
  const { productId } = props;
  const [error, setError] = useState<Error>();
  const router = useRouter();
  const storeUpdateCategory = useCityStore(
    (state) => state.storeUpdateCategory
  );
  const storeDeleteProduct = useCityStore((state) => state.storeDeleteProduct);
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
            title: 'Вы уверены что хотите удалить товар?',
            content: 'Это действие нельзя будет отменить',
            okText: 'Удалить',
            cancelText: 'Отмена',
            onOk() {
              return new Promise<void>((resolve, reject) => {
                deleteProductAction({ id: productId }).then((response) => {
                  if (response.message) {
                    setError(response);
                  } else {
                    storeDeleteProduct([productId]);
                    storeUpdateCategory(response.category);
                    setTimeout(() => {
                      router.push(
                        `/admin/categories/${response.category.slugEn}`
                      );
                    }, 0);
                  }
                  resolve();
                });
              });
            },
          });
        }}
      >
        Удалить товар
      </Button>
    </>
  );
}
