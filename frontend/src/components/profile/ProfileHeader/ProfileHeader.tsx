'use client';

import Button from '@commonComponents/Button/Button';
import './ProfileHeader.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useIsMobile from '@/hooks/useIsMobile';

export default function ProfileHeader() {
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
    <header className="profile-header">
      <div className="container profile-header__container">
        <Link href="/" className="profile-header__company">
          DELIVERY.GO
        </Link>
        <div className="profile-header__controls">
          <ProfileNav
            className="profile-header__element_hide-less-tablet"
            pathname={pathname}
          />
          <button
            onClick={toggleHandler}
            className={classNames(
              'profile-header__toggle',
              isMenuOpen && 'profile-header__toggle_active'
            )}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={classNames(
            'profile-header__mobile-nav',
            isMenuOpen && 'profile-header__mobile-nav_active'
          )}
        >
          <ProfileNav pathname={pathname} />
          <Button
            theme="orange"
            additionalClasses={'profile-header__contact-us-button'}
          >
            Связаться с нами
          </Button>
        </div>
      )}
    </header>
  );
}

function ProfileNav({
  className,
  pathname,
}: {
  className?: string;
  pathname: string;
}) {
  return (
    <nav className={classNames('profile-header__nav', className)}>
      <ul className="profile-header__nav-list">
        <li className="profile-header__nav-element">
          <Link
            className={
              pathname === '/orders'
                ? 'profile-header__active-link'
                : 'profile-header__link'
            }
            href="/orders"
          >
            Мои заказы
          </Link>
        </li>
        <li className="profile-header__nav-element">
          <Link
            className={
              pathname === '/profile'
                ? 'profile-header__active-link'
                : 'profile-header__link'
            }
            href="/profile"
          >
            Профиль
          </Link>
        </li>
      </ul>
    </nav>
  );
}
