import { apiProvider } from '@/features/api/client.ts';

export const fetchPurchaseHistory = async () => {
  return await apiProvider
    .get('https://not-contest-cdn.openbuilders.xyz/api/no_history.json')
    .then((res) => res.data);
};
