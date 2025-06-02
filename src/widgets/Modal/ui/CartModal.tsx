import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { useCartStore } from '@/entities/cart/cart.store.ts';
import { Body } from '@/shared/ui/Typography/Body/Body.tsx';
import { BottomBar } from '@/widgets/BottomBar';
import { Button } from '@/shared/ui/Button/Button.tsx';
import { CartItem } from '@/shared/ui/items/CartItem/CartItem.tsx';

const EmptyCart = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className={'pb-40 pt-20 text-center'}>
      <Title text={`Cart's cold`} />
      <Body text={'No items yet'} className={'text-secondary'} />
      <BottomBar>
        <Button text={'Ok'} onClick={closeModal} />
      </BottomBar>
    </div>
  );
};

interface CartModalProps {
  closeModal: () => void;
}

export const CartModal = ({ closeModal }: CartModalProps) => {
  const { cartItems, getTotalPrice, removeFromCart } = useCartStore();

  if (cartItems.length === 0) return <EmptyCart closeModal={closeModal} />;

  const totalPrice = getTotalPrice();
  return (
    <div className={'text-center pb-20'}>
      <Title text={'Cart'} level={3} />
      <div className={'flex flex-col gap-1 px-4 py-4'}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))}
      </div>
      <BottomBar>
        <Button text={`Buy for ${totalPrice} NOT`} />
      </BottomBar>
    </div>
  );
};
