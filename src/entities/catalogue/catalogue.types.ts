export interface CatalogueItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  left: number;
  tags: {
    fabric: string;
    [key: string]: string;
  };
  images: string[];
}
