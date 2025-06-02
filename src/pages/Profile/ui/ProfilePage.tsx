import { WebApp } from '@/init.ts';
import { ProfilePhoto } from '@/shared/ui/ProfilePhoto/ProfilePhoto.tsx';
import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { Body } from '@/shared/ui/Typography/Body/Body.tsx';
import { useProfileStore } from '@/entities/profile/profile.store.ts';
import { PurchaseItem } from '@/shared/ui/items/PurchaseItem/PurchaseItem.tsx';
import { useCatalogueStore } from '@/entities/catalogue/catalogue.store.ts';

const NoHistory = () => {
  return (
    <div className={'flex flex-col justify-center text-center'}>
      <Title text={'No history yet'} />
      <Body text={`Let's change that`} className={'text-secondary mt-2'} />
    </div>
  );
};

export const ProfilePage = () => {
  const { catalogue } = useCatalogueStore();
  const { purchases } = useProfileStore();
  const user = WebApp.initDataUnsafe.user;

  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center gap-2 pt-10">
        <ProfilePhoto
          username={user?.username}
          className="w-[120px] h-[120px]"
        />
        <Title
          text={user?.first_name ?? ''}
          className={'truncate max-w-[120px]'}
        />
      </div>
      {purchases.length > 0 ? (
        <div className="px-4">
          <Title text={'History'} level={3} className={'py-4'} />
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            {purchases.map((purchase, index) => {
              const item = catalogue?.find((c) => c.id === purchase.id);

              if (!item) return null;

              return (
                <PurchaseItem key={index} item={item} purchaseMeta={purchase} />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <NoHistory />
        </div>
      )}
    </div>
  );
};
