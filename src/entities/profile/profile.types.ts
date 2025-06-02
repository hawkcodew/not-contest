import { Currencies } from '@/entities/catalogue/catalogue.types.ts';

export interface PurchaseHistoryItem {
  timestamp: number;
  id: number;
  total: number;
  currency: Currencies;
}
