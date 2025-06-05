import { useWallet } from '@/features/hooks/useWallet.ts';
import { useCartStore } from '@/entities/cart/cart.store.ts';
import { useProfileStore } from '@/entities/profile/profile.store.ts';
import { CatalogueItem } from '@/entities/catalogue/catalogue.types.ts';
import { CartItemType } from '@/entities/cart/cart.types.ts';

export const useBuyItem = () => {
  const { connectWallet, isWalletConnected, generateTransaction } = useWallet();
  const { clearCart, setJustBought } = useCartStore();
  const { addPurchase } = useProfileStore();

  const onClickBuy = async (
    item: CatalogueItem | CartItemType[],
    amount: number
  ) => {
    const items = Array.isArray(item) ? item : [item];

    if (!isWalletConnected) {
      await connectWallet();
      return;
    }

    const isSuccess = await generateTransaction(amount);

    if (isSuccess) {
      const timestamp = Date.now() / 1000;

      const purchasedItems = items.map((item) => ({
        ...item,
        timestamp,
        total:
          'totalPrice' in item && typeof item.totalPrice === 'number'
            ? item.totalPrice
            : item.price,
      }));

      addPurchase(purchasedItems);

      setJustBought(true);
      clearCart();
    }
  };

  return {
    onClickBuy,
  };
};
