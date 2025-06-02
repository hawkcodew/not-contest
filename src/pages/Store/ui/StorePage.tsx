import { Header } from '@/widgets/Header';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard.tsx';
import { useCatalogueStore } from '@/entities/catalogue/catalogue.store.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NotFound } from '@/widgets/NotFound';
import { AnimationPage } from '@/app/AnimationPage.tsx';
import { hapticFeedback } from '@/features/hooks/useTelegramFeature.ts';
import { CartModal, Modal } from '@/widgets/Modal';
import { useModal } from '@/features/hooks/useModal.ts';
import { useCartStore } from '@/entities/cart/cart.store.ts';

export const StorePage = () => {
  const navigate = useNavigate();
  const { closeModal, isOpen, openModal } = useModal();
  const { catalogue } = useCatalogueStore();
  const { cartItems } = useCartStore();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const searchCatalogue =
    catalogue &&
    catalogue?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText)
    );

  const cartIds = new Set(cartItems.map((cartItem) => cartItem.id));

  return (
    <div className={'px-4'}>
      <Header onChange={handleSearch} openCart={openModal} />
      {searchCatalogue?.length === 0 && searchText ? (
        <NotFound />
      ) : (
        <AnimationPage animationKey={'catalogue'}>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 mt-2 mx-auto max-w-fit">
            {searchCatalogue?.map((item) => {
              const images = item.images ?? [];

              const rotatedImages =
                images.length > 0
                  ? [
                      ...images.slice(item.id % images.length),
                      ...images.slice(0, item.id % images.length),
                    ]
                  : [];

              const isInCart = cartIds.has(item.id);

              return (
                <ProductCard
                  onClick={() => {
                    hapticFeedback('light');
                    navigate(`/item/${item.id}`);
                  }}
                  key={item.id}
                  category={item.category}
                  images={rotatedImages}
                  name={item.name}
                  price={item.price}
                  currency={item.currency}
                  isInCart={isInCart}
                />
              );
            })}
          </div>{' '}
        </AnimationPage>
      )}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <CartModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};
