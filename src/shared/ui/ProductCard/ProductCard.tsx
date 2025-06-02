import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { Caption } from '@/shared/ui/Typography/Caption/Caption.tsx';
import { AnimationPage } from '@/app/AnimationPage.tsx';

interface ProductCardProps {
  onClick: () => void;
  image: string;
  name: string;
  category: string;
  price: number;
  currency: string;
}

export const ProductCard = ({
  onClick,
  image,
  name,
  category,
  price,
  currency,
}: ProductCardProps) => {
  return (
    <AnimationPage animationKey={name}>
      <div
        onClick={() => onClick()}
        className={'w-[173px] h-[227px] cursor-pointer active-click'}
      >
        <img
          alt="card-image"
          className={
            'max-h-[173px] max-w-[173px] w-full h-full object-cover rounded-2xl'
          }
          src={image}
        />
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
