'use client';

import { useCityStore } from '@store/city/useCityStore';
import { redirect } from 'next/navigation';
import AdminProductForm from '@adminComponents/AdminProductForm/AdminProductForm';
import Link from 'next/link';
import Breadcrumb, { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Collapse } from 'antd';

import './AdminProductPage.scss';
import AdminProductDelete from '../../AdminProductDelete/AdminProductDelete';

export default function AdminProductPage(props: { slugs: string[] }) {
  const { slugs } = props;
  const categorySlug = decodeURIComponent(slugs[0]);
  const productSlug = decodeURIComponent(slugs[1]);
  const city = useCityStore((state) => state.city);
  const category = city.categories.find(
    (el) => el.slugEn === categorySlug || el.slugRu === categorySlug
  );
  if (!category) redirect('/admin');

  const breadCrumbItems: ItemType[] = [
    {
      title: <Link href="/admin">О компании</Link>,
    },
    {
      title: <Link href="/admin/categories">Категории</Link>,
    },
    {
      title: (
        <Link href={`/admin/categories/${category.slugEn}`}>
          {category.title}
        </Link>
      ),
    },
  ];
  if (productSlug === 'new' || productSlug === 'new-product') {
    breadCrumbItems.push({ title: 'Создание нового товара' });
    return (
      <div className="product-page">
        <div className="product-page__heading">
          <Breadcrumb items={breadCrumbItems} />
          <h1 className="product-page__title">{`Создание нового товара (Категория "${category.title}")`}</h1>
        </div>
        <AdminProductForm category={category} />
      </div>
    );
  }
  const product = category.products.find(
    (el) => el.slugEn === productSlug || el.slugRu === productSlug
  );
  if (!product) redirect('/admin');
  breadCrumbItems.push({ title: `Редактирование товара "${product.title}"` });

  return (
    <div className="product-page">
      <div className="product-page__heading">
        <Breadcrumb items={breadCrumbItems} />
        <div className="product-page__title">{product?.title}</div>
      </div>
      <Collapse
        defaultActiveKey="edit"
        accordion={true}
        items={[
          {
            label: 'Редактирование товара',
            key: 'edit',
            children: (
              <AdminProductForm category={category} product={product} />
            ),
          },
          {
            label: 'Удаление товара',
            key: 'delete',
            children: <AdminProductDelete productId={product.id} />,
          },
        ]}
      />
    </div>
  );
}
