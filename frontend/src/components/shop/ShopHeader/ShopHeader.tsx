'use client';

import Button from '@commonComponents/Button/Button';
import './ShopHeader.scss';
import LoginButton from '@shopComponents/LoginButton/LoginButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useIsMobile from '@/hooks/useIsMobile';

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function ShopHeader({ isLoggedIn }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add('header-mobile-menu-open');
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('header-mobile-menu-open');
  };
  const toggleHandler = () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  const pathname = usePathname();
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const { isMobile } = useIsMobile();
  useEffect(() => {
    closeMenu();
  }, [isMobile]);

  return (
    <header className="shop-header">
      <div className="container shop-header__container">
        <Link href="/" className="shop-header__company">
          DELIVERY.GO
        </Link>
        <Button
          theme="orange"
          additionalClasses={[
            'shop-header__contact-us-button',
            'shop-header__element_hide-less-tablet',
          ]}
        >
          Связаться с нами
        </Button>
        <div className="shop-header__controls">
          <Nav
            isLoggedIn={isLoggedIn}
            className="shop-header__element_hide-less-tablet"
            pathname={pathname}
          />
          {!isLoggedIn && <LoginButton />}
          <button
            onClick={toggleHandler}
            className={classNames(
              'shop-header__toggle',
              isMenuOpen && 'shop-header__toggle_active'
            )}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={classNames(
            'shop-header__mobile-nav',
            isMenuOpen && 'shop-header__mobile-nav_active'
          )}
        >
          <Nav isLoggedIn={isLoggedIn} pathname={pathname} />
          <Button
            theme="orange"
            additionalClasses={'shop-header__contact-us-button'}
          >
            Связаться с нами
          </Button>
        </div>
      )}
    </header>
  );
}

function Nav({
  isLoggedIn,
  className,
  pathname,
}: {
  isLoggedIn: boolean;
  className?: string;
  pathname: string;
}) {
  return (
    <nav className={classNames('shop-header__nav', className)}>
      <ul className="shop-header__nav-list">
        <li className="shop-header__nav-element">
          <Link
            className={
              pathname === '/'
                ? 'shop-header__active-link'
                : 'shop-header__link'
            }
            href="/"
          >
            О нас
          </Link>
        </li>
        <li className="shop-header__nav-element">
          <Link
            className={
              pathname === '/how-it-works'
                ? 'shop-header__active-link'
                : 'shop-header__link'
            }
            href="/how-it-works"
          >
            Как мы работаем
          </Link>
        </li>
        {isLoggedIn && (
          <li className="shop-header__nav-element">
            <Link
              className={
                pathname === '/profile'
                  ? 'shop-header__active-link'
                  : 'shop-header__link'
              }
              href="/profile"
            >
              Профиль
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
