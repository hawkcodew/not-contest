import { CatalogueItem } from '../catalogue/catalogue.types';

export interface CartItemType extends CatalogueItem {
  quantity: number;
  totalPrice: number;
}
