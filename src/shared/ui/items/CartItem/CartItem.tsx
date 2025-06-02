import { CartItemType } from '@/entities/cart/cart.types.ts';
import { Caption } from '@/shared/ui/Typography/Caption/Caption.tsx';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { Body } from '@/shared/ui/Typography/Body/Body.tsx';
import { MinusIcon } from '@/shared/icons/minus_icon.tsx';

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (item: CartItemType) => void;
}
export const CartItem = ({ item, removeFromCart }: CartItemProps) => {
  return (
    <div className={'flex items-center justify-start gap-4'}>
      <img
        className={'max-w-[60px] w-full h-[60px] rounded-xl'}
        src={item.images[-1 + item.id]}
        alt=""
      />
      <div className={'flex items-center justify-between w-full'}>
        <div>
          <Caption
            text={item.category}
            className={'text-secondary text-left'}
          />
          <Title text={item.name} level={4} />
        </div>
        <Body
          text={`${item.price * item.quantity} ${item.currency}`}
          className={'text-primary'}
        />
      </div>
      <button
        onClick={() => removeFromCart(item)}
        className={
          'bg-button-additional p-1.5 text-primary rounded-lg cursor-pointer active-click'
        }
      >
        <MinusIcon />
      </button>
    </div>
  );
};
