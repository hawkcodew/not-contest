import { PurchaseHistoryItem } from '@/entities/profile/profile.types.ts';
import { Caption } from '@/shared/ui/Typography/Caption/Caption.tsx';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { CatalogueItem } from '@/entities/catalogue/catalogue.types.ts';
import { formatDate } from '@/features/utils/formatters.ts';

interface PurchaseItemProps {
  item: CatalogueItem;
  purchaseMeta: PurchaseHistoryItem;
}

export const PurchaseItem = ({ item, purchaseMeta }: PurchaseItemProps) => {
  return (
    <div className={'flex items-center justify-start gap-4 w-full'}>
      <img
        className={'max-w-[60px] w-full h-[60px] rounded-xl'}
        src={item.images[-1 + purchaseMeta.id]}
        alt=""
      />
      <div className={'flex items-center justify-between w-full'}>
        <div>
          <Caption
            text={item.category}
            className={'text-secondary text-left'}
          />
          <Title text={item.name} level={4} />
        </div>
        <div>
          <Caption
            text={formatDate(purchaseMeta.timestamp)}
            className={'text-secondary text-left'}
          />
          <Title
            text={`${purchaseMeta.total} ${purchaseMeta.currency}`}
            level={4}
          />
        </div>
      </div>
    </div>
  );
};
