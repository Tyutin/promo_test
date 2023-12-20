'use client';
import { Alert, Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { ProductEntityInterface } from '../../../../../shared/types/Product/front/ProductEntity.interface';
import { createProductAction, updateProductAction } from '@fetch/actions';
import { UpdateProductDtoInterface } from '../../../../../shared/types/Product/UpdateProductDto.interface';
import { CategoryEntityInterface } from '../../../../../shared/types/Category/front/CategoryEntity.interface';
import { CreateProductDtoInterface } from '../../../../../shared/types/Product/CreateProductDto.interface';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCityStore } from '@store/city/useCityStore';

export default function AdminProductForm(props: {
  category: CategoryEntityInterface;
  product?: ProductEntityInterface;
  formName?: string;
}) {
  const { product, formName, category } = props;
  const router = useRouter();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [successUpdateMessage, setSuccessUpdateMessage] = useState<string>();

  const storeAddProduct = useCityStore((state) => state.storeAddProduct);
  const storeUpdateProduct = useCityStore((state) => state.storeUpdateProduct);

  async function createProduct(dto: CreateProductDtoInterface) {
    setIsFetching(true);
    const productResponse = await createProductAction(dto);
    setIsFetching(false);
    if (!productResponse.product) {
      setError(productResponse);
    } else {
      storeAddProduct(category.id, productResponse.product);
      router.push(
        `/admin/categories/${category.slugEn}/${productResponse.product.slugEn}`
      );
    }
  }

  async function updateProduct(dto: UpdateProductDtoInterface) {
    setIsFetching(true);
    const productResponse = await updateProductAction(dto);
    setIsFetching(false);
    if (!productResponse.product) {
      setError(productResponse);
      return;
    }
    storeUpdateProduct(category.id, productResponse.product);
    if (!!product && productResponse.product.title !== product.title) {
      setTimeout(() => {
        router.push(
          `/admin/categories/${category.slugEn}/${productResponse.product.slugEn}`
        );
      }, 0);
    } else {
      setSuccessUpdateMessage('Товар успешно обновлен!');
    }
  }

  const onFinish = (
    dto: UpdateProductDtoInterface & CreateProductDtoInterface
  ) =>
    dto.id
      ? updateProduct(dto)
      : createProduct({ ...dto, categoryId: category.id });

  return (
    <Form
      name={formName || 'product'}
      size="large"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      disabled={isFetching}
      onValuesChange={(_values) => setSuccessUpdateMessage('')}
    >
      {error && (
        <Alert
          message={error.message}
          description={JSON.stringify(error, null, 2)}
          type="error"
          showIcon={true}
        />
      )}
      {successUpdateMessage && (
        <Alert message={successUpdateMessage} type="success" showIcon={true} />
      )}
      <Form.Item name="id" initialValue={product?.id} hidden={true}>
        <InputNumber hidden={true} name="id" />
      </Form.Item>
      <Form.Item
        initialValue={product?.published || false}
        name="published"
        valuePropName="checked"
      >
        <Checkbox
          value={product?.published || false}
          checked={product?.published || false}
          name="published"
        >
          {product ? 'Опубликован' : 'Опубликовать сразу'}
        </Checkbox>
      </Form.Item>
      <Form.Item
        label="Название блюда"
        name="title"
        initialValue={product?.title}
        rules={[{ required: true, message: 'Введите название блюда!' }]}
      >
        <Input type="text" maxLength={80} />
      </Form.Item>
      <Form.Item
        label="Цена"
        name="price"
        initialValue={product?.price || 1}
        rules={[{ required: true, message: 'Введите цену!' }]}
      >
        <InputNumber
          controls={false}
          parser={(value) => {
            const int = parseInt(value || '0');
            if (int < 0) {
              return 0;
            } else if (int > 1000000) {
              return 1000000;
            } else {
              return int;
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label="Описание (состав, калорийность...)"
        name="description"
        initialValue={product?.description}
        rules={[{ required: true, message: 'Введите описание блюда!' }]}
      >
        <Input.TextArea
          placeholder={`Состав: картошка, капуста ${'\n'}Калорийность на 100г: 240ккал`}
          maxLength={500}
        />
      </Form.Item>
      <Form.Item
        label="Вес(гр) / Объем(мл)"
        name="weight"
        initialValue={product?.weight || 1}
        rules={[{ required: true, message: 'Введите вес или объем блюда!' }]}
      >
        <InputNumber
          controls={false}
          parser={(value) => {
            const int = parseInt(value || '1');
            if (int < 1) {
              return 1;
            } else if (int > 100000) {
              return 100000;
            } else {
              return int;
            }
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
