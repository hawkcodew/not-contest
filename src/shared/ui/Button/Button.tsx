import React, { memo } from 'react';
import { WebApp } from '@/init.ts';
import classNames from 'classnames';

export interface ButtonProps {
  text?: string;
  onClick: () => void;
  className?: string;
  color?: 'white' | 'black';
}

export const Button: React.FC<ButtonProps> = memo(
  ({ text = '', onClick, className = '', color = 'white' }: ButtonProps) => {
    const baseClasses =
      'w-full text-[17px] leading-[22px] tracking-[-0.4px] font-[590] px-6 h-[50px] rounded-xl flex items-center justify-center cursor-pointer active-click';

    const colorClasses = classNames({
      'bg-button-bw text-bg-bw': color === 'black',
      'bg-button-additional text-primary': color === 'white',
    });

    const handleClick = () => {
      WebApp?.HapticFeedback?.impactOccurred?.('light');
      onClick();
    };

    return (
      <button
        onClick={handleClick}
        className={classNames(baseClasses, colorClasses, className)}
      >
        {text}
      </button>
    );
  }
);
