import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { Caption } from '@/shared/ui/Typography/Caption/Caption.tsx';
import { AnimationPage } from '@/app/AnimationPage.tsx';
import { TickIcon } from '@/shared/icons/tick_icon.tsx';
import { Carousel } from '@/shared/ui/Carousel/Carousel.tsx';
import { Currencies } from '@/entities/catalogue/catalogue.types.ts';

interface ProductCardProps {
  onClick: () => void;
  images: string[];
  name: string;
  category: string;
  price: number;
  currency: Currencies;
  isInCart: boolean;
}

export const ProductCard = ({
  onClick,
  images,
  name,
  category,
  price,
  currency,
  isInCart,
}: ProductCardProps) => {
  return (
    <AnimationPage animationKey={name}>
      <div
        onClick={() => onClick()}
        className={'w-[173px] h-[227px] cursor-pointer active-click relative'}
      >
        {isInCart && (
          <div
            className={`absolute top-2 right-2 z-[1] flex items-center justify-center w-[22px] h-[22px] rounded-3xl text-bw bg-button-bw`}
          >
            <TickIcon />
          </div>
        )}
        <Carousel images={images} />
        <div className={'mx-2'}>
          <Title
            text={`${category} ${name}`}
            level={4}
            className="truncate w-full mt-2"
          />
          <div className={'flex items-center gap-1'}>
            <Caption text={price} className={'text-primary'} />
            <Caption text={currency} className={'text-secondary'} />
          </div>
        </div>
      </div>
    </AnimationPage>
  );
};
