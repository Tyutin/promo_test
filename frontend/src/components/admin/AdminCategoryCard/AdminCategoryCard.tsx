'use client';
import { CategoryEntityInterface } from '@shared/types/Category/front/CategoryEntity.interface';
import './AdminCategoryCard.scss';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';

export default function AdminCategoryCard(props: {
  category?: CategoryEntityInterface;
}) {
  const { category } = props;
  return (
    <Link
      href={`/admin/categories/${category ? category.slugEn : 'new-category'}`}
      className={classNames('category-card', {
        'category-card_unpublished': category ? !category.published : false,
      })}
    >
      <div className="category-card__image-wrapper">
        <Image
          quality={100}
          src={category ? '/images/items/item.png' : '/images/svg/add-item.svg'}
          alt={category ? category.title : 'Иконка создания нового товара'}
          className="category-card__image"
          fill={true}
        />
      </div>
      <span className="category-card__title">
        {category ? category.title : 'Создать новую категорию'}
      </span>

      {!!category && (
        <span className="category-card__published">
          {category.published ? 'Опубликовано' : 'Не опубликовано'}
        </span>
      )}
    </Link>
  );
}
