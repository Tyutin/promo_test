'use client';

import Button from '@commonComponents/Button/Button';
import './Header.scss';
import LoginButton from '@shopComponents/LoginButton/LoginButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useIsMobile from '@/hooks/useIsMobile';

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: HeaderProps) {
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
    <header className="header">
      <div className="container header__container">
        <Link href="/" className="header__company">
          DELIVERY.GO
        </Link>
        <Button
          theme="orange"
          additionalClasses={[
            'header__contact-us-button',
            'header__element_hide-less-tablet',
          ]}
        >
          Связаться с нами
        </Button>
        <div className="header__controls">
          <Nav
            isLoggedIn={isLoggedIn}
            className="header__element_hide-less-tablet"
            pathname={pathname}
          />
          {!isLoggedIn && <LoginButton />}
          <button
            onClick={toggleHandler}
            className={classNames(
              'header__toggle',
              isMenuOpen && 'header__toggle_active'
            )}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={classNames(
            'header__mobile-nav',
            isMenuOpen && 'header__mobile-nav_active'
          )}
        >
          <Nav isLoggedIn={isLoggedIn} pathname={pathname} />
          <Button
            theme="orange"
            additionalClasses={'header__contact-us-button'}
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
    <nav className={classNames('header__nav', className)}>
      <ul className="header__nav-list">
        <li className="header__nav-element">
          <Link
            className={
              pathname === '/' ? 'header__active-link' : 'header__link'
            }
            href="/"
          >
            О нас
          </Link>
        </li>
        <li className="header__nav-element">
          <Link
            className={
              pathname === '/how-it-works'
                ? 'header__active-link'
                : 'header__link'
            }
            href="/how-it-works"
          >
            Как мы работаем
          </Link>
        </li>
        {isLoggedIn && (
          <li className="header__nav-element">
            <Link
              className={
                pathname === '/profile' ? 'header__active-link' : 'header__link'
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
