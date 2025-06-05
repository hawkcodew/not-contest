import { JSX } from 'react';

interface TitleProps {
  text: string | number;
  level?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  onClick?: () => void;
}

export const Title = ({
  text,
  level = 1,
  className = '',
  onClick,
}: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyle = 'font-[590] text-primary';
  const headingStyles: Record<number, string> = {
    0: 'text-[36px] leading-9 tracking-[0.4px]',
    1: 'text-[26px] leading-8 tracking-[0.38px]',
    2: 'text-[22px] leading-7 tracking-[0.32px]',
    3: 'text-[20px] leading-6',
    4: 'text-[17px] leading-6 tracking-[-0.7px]',
  };

  return (
    <Tag
      onClick={onClick}
      className={`${baseStyle} ${headingStyles[level]} ${className}`}
    >
      {text}
    </Tag>
  );
};
