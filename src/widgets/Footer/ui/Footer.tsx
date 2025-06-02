import React from 'react';
import { FooterMock } from '@/features/mock/FooterMock.tsx';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { WebApp } from '@/init.ts';

interface FooterLinkItemProps {
  item: {
    link: string;
    title: string;
    icon: React.ReactElement<SVGAElement>;
  };
}

const FooterLinkItem = ({ item }: FooterLinkItemProps) => {
  const handleClick = () => {
    WebApp.HapticFeedback?.impactOccurred('light');
  };

  return (
    <NavLink
      className={({ isActive }) =>
        classNames(
          'flex flex-col gap-0.5 items-center justify-center max-w-footer-link w-full active-click text-primary ',
          !isActive && 'opacity-60'
        )
      }
      onClick={handleClick}
      to={item.link}
    >
      {({ isActive }) => (
        <>
          <span className={'pt-1 pb-0.5 px-[7px]'}>{item.icon}</span>
          <span
            className={classNames(
              'text-[10px] font-[510] text-primary',
              isActive ? 'opacity-100' : 'opacity-20'
            )}
            onClick={handleClick}
          >
            {item.title}
          </span>
        </>
      )}
    </NavLink>
  );
};

export const Footer = () => {
  return (
    <div
      className={
        'flex items-center w-full bg-bw border-system border-t-[0.33px] fixed bottom-0 z-[50] pt-0.5 pb-5'
      }
    >
      {FooterMock.map((item) => (
        <FooterLinkItem item={item} key={item.link} />
      ))}
    </div>
  );
};
