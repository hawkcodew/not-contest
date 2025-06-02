import React, { memo } from 'react';
import classNames from 'classnames';
import { hapticFeedback } from '@/features/hooks/useTelegramFeature.ts';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';

export interface ButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
  color?: 'white' | 'black';
  isCounter?: boolean;
  value?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const Button: React.FC<ButtonProps> = memo(
  ({
    text = '',
    onClick,
    className = '',
    color = 'white',
    isCounter = false,
    value = 1,
    onIncrease,
    onDecrease,
  }) => {
    const baseClasses =
      'w-full text-[17px] leading-[22px] tracking-[-0.4px] font-[590] px-6 h-[50px] rounded-xl flex items-center justify-center cursor-pointer active-click';

    const colorClasses = classNames({
      'bg-button-bw text-bw': color === 'black',
      'bg-button-additional text-primary': color === 'white',
    });

    const counterButtonClasses =
      'flex items-center justify-center w-5 h-6 cursor-pointer active-click';

    const handleClick = () => {
        hapticFeedback('light');
      onClick?.();
    };

    if (isCounter) {
      return (
        <div
          className={classNames(
            'flex items-center justify-center gap-3 rounded-xl w-full h-[50px] px-6 ',
            colorClasses,
            className
          )}
        >
          <button
            type="button"
            onClick={() => {
              onDecrease?.();
                hapticFeedback('light');
            }}
            className={counterButtonClasses}
          >
            <Title text="−" level={4} className={'w-5'} />
          </button>

          <Title text={value} level={3} className="min-w-7 text-center" />

          <button
            type="button"
            onClick={() => {
              onIncrease?.();
                hapticFeedback('light');
            }}
            className={counterButtonClasses}
          >
            <Title text="+" level={4} className={'w-5'} />
          </button>
        </div>
      );
    }

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
