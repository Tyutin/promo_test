'use client';

import { useCityStore } from '@store/city/useCityStore';
import AdminCategoryForm from '@adminComponents/AdminCategoryForm/AdminCategoryForm';
import { redirect } from 'next/navigation';
import { Collapse } from 'antd';
import AdminCategoryProductCard from '@adminComponents/AdminCategoryProductCard/AdminCategoryProductCard';
import Link from 'next/link';
import Breadcrumb, { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

import './AdminCategoryPage.scss';
import AdminCategoryDelete from '@adminComponents/AdminCategoryDelete/AdminCategoryDelete';

export default function AdminCategoryPage(props: { slug: string }) {
  const { slug } = props;
  const categorySlug = decodeURIComponent(slug);
  const city = useCityStore((state) => state.city);
  const breadCrumbItems: ItemType[] = [
    {
      title: <Link href="/admin">О компании</Link>,
    },
    {
      title: <Link href="/admin/categories">Категории</Link>,
    },
  ];
  if (categorySlug === 'new' || categorySlug === 'new-category') {
    breadCrumbItems.push({ title: 'Создание новой категории' });
    return (
      <div className="category-page">
        <div className="category-page__heading">
          <Breadcrumb items={breadCrumbItems} />
          <h1 className="category-page__title">Создание новой категории</h1>
        </div>
        <AdminCategoryForm city={city} />
      </div>
    );
  }
  const category = city.categories.find(
    (el) => el.slugEn === categorySlug || el.slugRu === categorySlug
  );
  if (!category) redirect('/admin');
  breadCrumbItems.push({ title: `Редактирование категории ${category.title}` });

  const sortedProducts = [...category.products].sort((a, b) => {
    if (a.published === b.published) {
      return a.title > b.title ? 1 : -1;
    } else return a.published > b.published ? -1 : 1;
  });
  return (
    <div className="category-page">
      <div className="category-page__heading">
        <Breadcrumb items={breadCrumbItems} />
        <h1 className="category-page__title">{`Категория "${category.title}"`}</h1>
      </div>
      <Collapse
        accordion={true}
        defaultActiveKey="edit-category"
        size="large"
        items={[
          {
            key: 'edit-category',
            label: 'Редактирование категории',
            children: <AdminCategoryForm city={city} category={category} />,
          },
          {
            key: 'category-products',
            label: `Товары категории "${category.title}"`,
            children: (
              <ul className="category-page__product-list">
                <li className="category-page__product-item">
                  <AdminCategoryProductCard categorySlug={category.slugEn} />
                </li>
                {sortedProducts.map((product) => {
                  return (
                    <li
                      key={product.id}
                      className="category-page__product-item"
                    >
                      <AdminCategoryProductCard
                        product={product}
                        categorySlug={category.slugEn}
                      />
                    </li>
                  );
                })}
              </ul>
            ),
          },
          {
            label: 'Удаление категории',
            key: 'delete',
            children: <AdminCategoryDelete category={category} />,
          },
        ]}
      />
    </div>
  );
}
