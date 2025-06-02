import { createBrowserRouter } from 'react-router-dom';
import { StorePage } from '@/pages/Store';
import { Layout } from '@/app/Layout.tsx';
import { ProfilePage } from '@/pages/Profile';
import { ItemPage } from '@/pages/Item';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Something went wrong...</div>,
    children: [
      { path: '/', element: <StorePage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/item/:id', element: <ItemPage /> },
    ],
  },
]);
