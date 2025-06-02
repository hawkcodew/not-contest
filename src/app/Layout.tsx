import { Footer } from '@/widgets/Footer';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useCatalogueStore } from '@/entities/catalogue/catalogue.store.ts';
import { AnimationPage } from '@/app/AnimationPage.tsx';
import { useBackButton } from '@/features/hooks/useBackButton.ts';
import { useProfileStore } from '@/entities/profile/profile.store.ts';

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { getCatalogue, loading } = useCatalogueStore();
  const { getPurchaseHistory, loading: profileLoading } = useProfileStore();

  const complexInitFetch = useCallback(async () => {
    await Promise.all([getCatalogue(), getPurchaseHistory()]);
  }, [getCatalogue, getPurchaseHistory]);

  useBackButton({ hide: true });

  useEffect(() => {
    complexInitFetch().then();
  }, [complexInitFetch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  const shouldHideFooter = pathname.includes('/item');

  if (loading || profileLoading) {
    return 'Loading....';
  }

  return (
    <div className={'pt-safe pb-20'}>
      <AnimationPage animationKey={pathname}>
        {children}
        <Outlet />
      </AnimationPage>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};
