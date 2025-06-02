import { JSX } from 'react';

interface TitleProps {
  text: string;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export const Title = ({ text, level = 1, className = '' }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyle = 'font-[590] text-primary';
  const headingStyles: Record<number, string> = {
    1: 'text-[26px] leading-8 tracking-[0.38px]',
    2: 'text-[22px] leading-7 tracking-[0.32px]',
    3: 'text-[18px] leading-6 tracking-[0.28px]',
    4: 'text-[17px] leading-6 tracking-[-0.7px]',
  };

  return (
    <Tag className={`${baseStyle} ${headingStyles[level]} ${className}`}>
      {text}
    </Tag>
  );
};
