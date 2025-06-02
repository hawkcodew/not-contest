import { CatalogueItem } from '@/entities/catalogue/catalogue.types.ts';
import { create } from 'zustand';
import { fetchCatalogueItems } from '@/entities/catalogue/catalogue.api.ts';

interface CatalogueState {
  catalogue: CatalogueItem[] | null;
  loading: boolean;
  error: string | null;
  getCatalogue: () => Promise<void>;
}

export const useCatalogueStore = create<CatalogueState>((set) => ({
  catalogue: null,
  loading: true,
  error: null,

  getCatalogue: async () => {
    try {
      const { data } = await fetchCatalogueItems();
      set({ catalogue: data });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
}));
