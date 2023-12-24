'use client';
import classNames from 'classnames';
import './Button.scss';
import Link from 'next/link';

type ButtonProps = {
  onClick?: () => void;
  theme: 'orange' | 'rose' | 'white-orange' | null;
  additionalClasses?: string | string[];
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  tag?: 'button' | 'a';
  href?: string;
};

export default function Button({
  onClick,
  theme,
  additionalClasses,
  type,
  children,
  tag = 'button',
  href,
}: ButtonProps) {
  if (tag === 'a') {
    return (
      <Link
        href={href || '/'}
        className={classNames(
          'button',
          {
            [`button_theme_${theme}`]: theme,
          },
          additionalClasses
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={classNames(
        'button',
        {
          [`button_theme_${theme}`]: theme,
        },
        additionalClasses
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
