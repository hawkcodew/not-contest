import { ProfilePhoto } from '@/shared/ui/ProfilePhoto/ProfilePhoto.tsx';
import { WebApp } from '@/init.ts';
import { StoreIcon } from '@/shared/icons/store_icon.tsx';

export const FooterMock = [
  {
    title: 'Store',
    link: '/',
    icon: <StoreIcon />,
  },
  {
    title: 'Alex',
    link: '/profile',
    icon: (
      <ProfilePhoto
        className={'w-6 h-6'}
        username={WebApp.initDataUnsafe.user?.username}
      />
    ),
  },
];
