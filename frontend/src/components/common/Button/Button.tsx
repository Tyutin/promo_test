'use client';
import classNames from 'classnames';
import './Button.scss';

type ButtonProps = {
  onClick?: () => void;
  theme: 'orange' | 'rose' | 'white-orange' | null;
  additionalClasses?: string | string[];
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
};

export default function Button({
  onClick,
  theme,
  additionalClasses,
  type,
  children,
}: ButtonProps) {
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
