'use client';
import { Alert, Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { createCategoryAction, updateCategoryAction } from '@fetch/actions';
import { CategoryEntityInterface } from '../../../../../shared/types/Category/front/CategoryEntity.interface';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CityEntityInterface } from '@shared/types/City/front/CityEntity.interface';
import { UpdateCategoryDtoInterface } from '@shared/types/Category/UpdateCategoryDto.interface';
import { CreateCategoryDtoInterface } from '@shared/types/Category/CreateCategoryDto.interface';
import { useCityStore } from '@store/city/useCityStore';

export default function AdminCategoryForm(props: {
  city: CityEntityInterface;
  category?: CategoryEntityInterface;
  formName?: string;
}) {
  const { city, formName, category } = props;
  const router = useRouter();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [successUpdateMessage, setSuccessUpdateMessage] = useState<string>();

  const storeUpdateCategory = useCityStore(
    (state) => state.storeUpdateCategory
  );
  const storeAddCategory = useCityStore((state) => state.storeAddCategory);

  async function createCategory(dto: CreateCategoryDtoInterface) {
    setIsFetching(true);
    const categoryResponse = await createCategoryAction(dto);
    setIsFetching(false);
    if (!categoryResponse.category) {
      setError(categoryResponse);
    } else {
      storeAddCategory(categoryResponse.category);
      router.push(`/admin/categories/${categoryResponse.category.slugEn}`);
    }
  }

  async function updateCategory(dto: UpdateCategoryDtoInterface) {
    setIsFetching(true);
    const categoryResponse = await updateCategoryAction(dto);
    setIsFetching(false);
    if (!categoryResponse.category) {
      setError(categoryResponse);
      return;
    }
    storeUpdateCategory(categoryResponse.category);
    if (category && categoryResponse.category.title !== category.title) {
      setTimeout(() => {
        router.push(`/admin/categories/${categoryResponse.category.slugEn}`);
      }, 0);
    } else {
      setSuccessUpdateMessage('Категория успешно обновлена!');
    }
  }

  const onFinish = (
    dto: UpdateCategoryDtoInterface & CreateCategoryDtoInterface
  ) =>
    dto.id ? updateCategory(dto) : createCategory({ ...dto, cityId: city.id });

  return (
    <Form
      name={formName || 'category'}
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
      <Form.Item name="id" initialValue={category?.id} hidden={true}>
        <InputNumber hidden={true} name="id" />
      </Form.Item>
      <Form.Item
        initialValue={category?.published || false}
        name="published"
        valuePropName="checked"
      >
        <Checkbox
          value={category?.published || false}
          checked={category?.published || false}
          name="published"
        >
          {category ? 'Опубликована' : 'Опубликовать сразу'}
        </Checkbox>
      </Form.Item>
      <Form.Item
        label="Название категории"
        name="title"
        initialValue={category?.title}
        rules={[{ required: true, message: 'Введите название категории!' }]}
      >
        <Input type="text" maxLength={80} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
}
