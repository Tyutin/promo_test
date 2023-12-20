'use client';

import {
  SettingOutlined,
  ShoppingCartOutlined,
  DatabaseOutlined,
  PercentageOutlined,
  RollbackOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CityEntityInterface } from '../../../../../shared/types/City/front/CityEntity.interface';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCityStore } from '@store/city/useCityStore';

export default function AdminMenu() {
  const city = useCityStore((state) => state.city);
  const router = useRouter();
  const items = getMenuItems(city, router);
  return (
    <Menu
      // style={{ width: 256 }}
      // defaultSelectedKeys={['about']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
}

function getMenuItems(
  city: CityEntityInterface,
  router: AppRouterInstance
): ItemType[] {
  const categoriesMenuItems: ItemType[] = city.categories.map((cat) => {
    const path = `/admin/categories/${cat.slugEn}`;
    return {
      label: cat.title,
      key: path,
      onClick: () => {
        router.push(path);
      },
    };
  });
  const defaultCategoriesMenuItems: ItemType[] = [
    {
      label: 'Все категории',
      key: 'all-categories',
      onClick: () => {
        router.push('/admin/categories/');
      },
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'Новая категория',
      key: 'new-category',
      onClick: () => {
        router.push('/admin/categories/new-category');
      },
      icon: <PlusCircleOutlined />,
    },
  ];
  const links: {
    text: string;
    href: string;
    icon: React.ReactNode;
    children?: ItemType[];
  }[] = [
    {
      text: 'О компании',
      href: '/admin',
      icon: <SettingOutlined />,
    },
    {
      text: 'Категории',
      href: '/admin/categories',
      icon: <DatabaseOutlined />,
      children: [...defaultCategoriesMenuItems, ...categoriesMenuItems],
    },
    {
      text: 'Доставка',
      href: '/admin/delivery',
      icon: <ShoppingCartOutlined />,
    },
    {
      text: 'Акции',
      href: '/admin/promo',
      icon: <PercentageOutlined />,
    },
    {
      text: 'Выход',
      href: '/',
      icon: <RollbackOutlined />,
    },
  ];

  return links.map((el) => {
    if (el.children) {
      return {
        icon: el.icon,
        label: el.text,
        key: el.href,
        children: el.children,
      };
    } else {
      return {
        icon: el.icon,
        label: el.text,
        key: el.href,
        onClick: () => {
          router.push(el.href);
        },
      };
    }
  });
}
