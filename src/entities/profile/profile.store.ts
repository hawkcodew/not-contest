import { PurchaseHistoryItem } from '@/entities/profile/profile.types.ts';
import { create } from 'zustand/index';
import { fetchPurchaseHistory } from '@/entities/profile/profile.api.ts';

interface ProfileStore {
  purchases: PurchaseHistoryItem[] | [];
  loading: boolean;
  error: string | null;
  getPurchaseHistory: () => Promise<void>;
  addPurchase: (items: PurchaseHistoryItem[]) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  purchases: [],
  loading: true,
  error: null,

  getPurchaseHistory: async () => {
    try {
      const { data } = await fetchPurchaseHistory();
      const sorted = data
        .sort(
          (a: PurchaseHistoryItem, b: PurchaseHistoryItem) =>
            b.timestamp - a.timestamp
        )
        .slice(0, 10);
      set({ purchases: sorted.slice(0, 10) });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
  addPurchase: (items: PurchaseHistoryItem[]) => {
    const existingItems = get().purchases;

    set({ purchases: [...items, ...existingItems] });
  },
}));
