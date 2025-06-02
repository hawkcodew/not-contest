import { apiProvider } from '@/features/api/client.ts';

export const fetchCatalogueItems = async () => {
  return await apiProvider.get('/items.json').then((res) => res.data);
};
