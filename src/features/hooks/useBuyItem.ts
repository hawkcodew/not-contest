import { useWallet } from '@/features/hooks/useWallet.ts';
import { useCartStore } from '@/entities/cart/cart.store.ts';

export const useBuyItem = () => {
  const { connectWallet, isWalletConnected, generateTransaction } = useWallet();
  const { clearCart, setJustBought } = useCartStore();

  const onClickBuy = async (amount: number) => {
    if (isWalletConnected) {
      const isSuccess = await generateTransaction(amount);

      if (isSuccess) {
        setJustBought(true);
        return clearCart();
      }
    } else {
      await connectWallet();
    }
  };

  return {
    onClickBuy,
  };
};
