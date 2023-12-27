import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@assets/styles/global.scss';
import './ShopLayout.scss';
import Header from '@shopComponents/Header/Header';
import { getSession } from '@/typeorm/getSession';
import RefCodeHandler from '@shopComponents/RefCodeHandler/RefCodeHandler';

const montserrat = Inter({ subsets: ['latin', 'cyrillic', 'cyrillic-ext'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <div className="shop-layout">
          <Header isLoggedIn={session.isLoggedIn} />
          <main className="container shop-layout__page">{children}</main>
        </div>
      </body>
      <RefCodeHandler />
    </html>
  );
}
