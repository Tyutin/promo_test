'use client';

import { Layout } from 'antd';
import { useCityStore } from '@store/city/useCityStore';
import { CityEntityInterface } from '@shared/types/City/front/CityEntity.interface';
import AdminMenu from '@adminComponents/AdminMenu/AdminMenu';

const { Sider, Content } = Layout;

export default function AdminClientLayout(props: {
  children: React.ReactNode;
  cityFromProps: CityEntityInterface;
}) {
  const { children, cityFromProps } = props;
  useCityStore.setState({ city: cityFromProps });
  return (
    <Layout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        zeroWidthTriggerStyle={{ top: '0' }}
        width={250}
      >
        <div className="demo-logo-vertical" />
        <AdminMenu />
      </Sider>
      <Layout>
        <Content>
          <div className="admin-layout">
            <main className="admin-layout__page">{children}</main>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
