import { Navigate, useParams } from 'react-router-dom';
import { useCatalogueStore } from '@/entities/catalogue/catalogue.store.ts';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { ShareIcon } from '@/shared/icons/share_icon.tsx';
import { Body } from '@/shared/ui/Typography/Body/Body.tsx';
import { ItemMetaTags } from '@/pages/Item/ui/ItemMetaTags.tsx';
import { useState } from 'react';
import { useBackButton } from '@/features/hooks/useBackButton.ts';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { BottomBar } from '@/widgets/BottomBar';
import { formatTextSplit } from '@/features/utils/formatters.ts';
import { hapticFeedback, share } from '@/features/hooks/useTelegramFeature.ts';
import { useCartStore } from '@/entities/cart/cart.store.ts';
import { useBuyItem } from '@/features/hooks/useBuyItem.ts';

export const ItemPage = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState<number>(Number(id - 1));
  const { catalogue } = useCatalogueStore();
  const { removeFromCart, addToCart, cartItems } = useCartStore();
  const { onClickBuy } = useBuyItem();

  useBackButton({ navigateTo: '/', hide: false });
  const item = catalogue?.find((item) => item.id === Number(id));

  if (!item) return <Navigate to={'/'} />;

  const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  return (
    <>
      <div className={'p-4'}>
        <div className={'flex items-center justify-between pb-3'}>
          <Title text={`${item.category} ${item.name}`} />
          <div
            onClick={() => share(item)}
            className={'text-primary cursor-pointer active-click'}
          >
            <ShareIcon />
          </div>
        </div>
        <div>
          <Body
            text={formatTextSplit(item.description)}
            className={'text-primary whitespace-pre-line'}
          />
          <ItemMetaTags
            price={item.price}
            currency={item.currency}
            left={item.left}
            tags={item.tags}
          />
        </div>
        <div>
          <img
            className="rounded-[20px] object-cover w-full h-[45vh]"
            src={item.images[selectedImage]}
            alt=""
          />
          <div className="flex items-center pt-2 gap-2 overflow-x-scroll w-full h-full ">
            {item.images.map((image, index) => (
              <img
                onClick={() => {
                  hapticFeedback('light');
                  setSelectedImage(index);
                }}
                key={index}
                src={image}
                alt="additional_image"
                className={`rounded-2xl w-[100px] h-[100px] flex-none object-cover active-click ${selectedImage === index ? 'border border-border-bw' : 'border border-transparent'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomBar className={'flex items-center gap-3'}>
        {isItemInCart ? (
          <Button
            isCounter={true}
            onIncrease={() => addToCart(item)}
            onDecrease={() => removeFromCart(item)}
            value={isItemInCart.quantity}
          />
        ) : (
          <Button
            text={'Add to cart'}
            onClick={() => addToCart(item)}
            color={'white'}
          />
        )}

        <Button
          text={'Buy now'}
          onClick={() => onClickBuy(item, item.price)}
          color={'black'}
        />
      </BottomBar>
    </>
  );
};
