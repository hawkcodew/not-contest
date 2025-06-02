export type Currencies = 'NOT';

export interface CatalogueItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: Currencies;
  left: number;
  tags: {
    fabric: string;
    [key: string]: string;
  };
  images: string[];
}
