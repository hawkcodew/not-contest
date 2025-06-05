import { Footer } from '@/widgets/Footer';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCatalogueStore } from '@/entities/catalogue/catalogue.store.ts';
import { AnimationPage } from '@/app/AnimationPage.tsx';
import { useBackButton } from '@/features/hooks/useBackButton.ts';
import { useProfileStore } from '@/entities/profile/profile.store.ts';
import { useCartStore } from '@/entities/cart/cart.store.ts';
import { BottomBar } from '@/widgets/BottomBar';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { SuccessPurchase } from '@/widgets/SuccessPurchase';
import { WebApp } from '@/init.ts';
import { useBuyItem } from '@/features/hooks/useBuyItem.ts';
import { Loader } from '@/widgets/Loader';

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getCatalogue, loading } = useCatalogueStore();
  const { getTotalPrice, justBought, cartItems } = useCartStore();
  const { getPurchaseHistory, loading: profileLoading } = useProfileStore();
  const { onClickBuy } = useBuyItem();

  const complexInitFetch = useCallback(async () => {
    await Promise.all([getCatalogue(), getPurchaseHistory()]);
  }, [getCatalogue, getPurchaseHistory]);

  useBackButton({ hide: true });

  useEffect(() => {
    complexInitFetch().then();
  }, [complexInitFetch]);

  useEffect(() => {
    const startParam = WebApp.initDataUnsafe.start_param;

    if (startParam?.includes('item')) {
      navigate(`/item/${startParam.replace('item=', '')}`);
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, justBought]);

  const shouldHideFooter = pathname.includes('/item');
  const totalCartPrice = getTotalPrice();

  if (loading || profileLoading) {
    return <Loader />;
  }

  return (
    <div className={'pt-safe pb-20'}>
      {justBought && <SuccessPurchase />}
      <AnimationPage animationKey={pathname}>
        {children}
        <Outlet />
      </AnimationPage>
      {totalCartPrice > 0 && !shouldHideFooter ? (
        <BottomBar>
          <Button
            color={'black'}
            onClick={() => onClickBuy(cartItems, totalCartPrice)}
            text={`Buy for ${totalCartPrice} NOT`}
          />
        </BottomBar>
      ) : (
        !shouldHideFooter && <Footer />
      )}
    </div>
  );
};
