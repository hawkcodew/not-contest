import { Header } from '@/widgets/Header';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard.tsx';
import { useCatalogueStore } from '@/entities/catalogue/catalogue.store.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NotFound } from '@/widgets/NotFound';
import { AnimationPage } from '@/app/AnimationPage.tsx';
import { hapticFeedBack } from '@/features/hooks/useTelegramFeature.ts';

export const StorePage = () => {
  const navigate = useNavigate();
  const { catalogue } = useCatalogueStore();
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

  return (
    <div className={'px-4'}>
      <Header onChange={handleSearch} />
      {searchCatalogue?.length === 0 && searchText ? (
        <NotFound />
      ) : (
        <AnimationPage animationKey={'catalogue'}>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 mt-2 mx-auto max-w-fit">
            {searchCatalogue?.map((item) => {
              const image = item.images?.[-1 + item.id] ?? '';

              return (
                <ProductCard
                  onClick={() => {
                    hapticFeedBack('light');
                    navigate(`/item/${item.id}`);
                  }}
                  key={item.id}
                  category={item.category}
                  image={image}
                  name={item.name}
                  price={item.price}
                  currency={item.currency}
                />
              );
            })}
          </div>{' '}
        </AnimationPage>
      )}
    </div>
  );
};
