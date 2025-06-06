import { Tag } from '@/shared/ui/Tag/Tag.tsx';
import { Currencies } from '@/entities/catalogue/catalogue.types.ts';

interface ItemMetaTagsProps {
  price: number;
  currency: Currencies;
  left: number;
  tags: Record<string, string>;
}
export const ItemMetaTags = ({
  price,
  currency,
  left,
  tags,
}: ItemMetaTagsProps) => {
  return (
    <div className={'flex items-center gap-2 py-4'}>
      <Tag value={`${price} $${currency}`} />
      <Tag value={`${left} LEFT`} />
      {Object.entries(tags).map(([key, value]) => (
        <Tag key={key} value={`${value}`} />
      ))}
    </div>
  );
};
