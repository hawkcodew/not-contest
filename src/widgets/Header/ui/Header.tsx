import { Title } from '@/shared/ui/Typography/Title/Title.tsx';
import { SearchIcon } from '@/shared/icons/search_icon.tsx';
import { CartIcon } from '@/shared/icons/cart_icon.tsx';
import React, { useEffect, useState } from 'react';
import { useBackButton } from '@/features/hooks/useBackButton.ts';
import { hapticFeedback } from '@/features/hooks/useTelegramFeature.ts';
import { useCartStore } from '@/entities/cart/cart.store.ts';

const SearchInput = ({
  onClose,
  onChange,
}: {
  onClose: () => void;
  onChange: (text: string) => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-end gap-3 pt-3 w-full">
      <div
        className="flex items-center gap-2 bg-bg-secondary rounded-[10px] py-1 px-2.5 text-secondary overflow-hidden origin-right w-full"
        style={{
          transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <SearchIcon />
        <input
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          type="text"
          className="w-full text-[17px] leading-[22px] tracking-[-0.43px] bg-transparent outline-none text-primary placeholder:text-secondary caret-secondary"
          autoFocus
          placeholder="Search"
        />
      </div>

      {mounted && (
        <span
          onClick={() => {
            hapticFeedback('light');
            setMounted(false);
            setTimeout(() => {
              onClose();
              onChange('');
            }, 300);
          }}
          className="text-primary cursor-pointer select-none"
        >
          Cancel
        </span>
      )}
    </div>
  );
};

interface IconButtonProps extends React.PropsWithChildren {
  title?: string;
  onClick?: () => void;
}

const IconButton = ({ children, title, onClick }: IconButtonProps) => (
  <div
    className="active-click cursor-pointer text-primary"
    onClick={onClick}
    title={title}
  >
    {children}
  </div>
);

interface HeaderProps {
  onChange: (text: string) => void;
  openCart: () => void;
}

export const Header = ({ onChange, openCart }: HeaderProps) => {
  const { getTotalCount } = useCartStore();

  const [isSearchInput, setIsSearchInput] = useState(false);

  useBackButton({
    hide: !isSearchInput,
    onBack: () => {
      onChange('');
      setIsSearchInput(false);
    },
  });

  const totalCartCount = getTotalCount();

  return (
    <div className="flex items-center justify-between pb-3">
      {isSearchInput ? (
        <SearchInput
          onClose={() => {
            setIsSearchInput(false);
          }}
          onChange={onChange}
        />
      ) : (
        <div className="flex items-center justify-between w-full pt-4">
          <Title text="Not Store" />
          <div className="flex items-center justify-center gap-2">
            <IconButton
              onClick={() => {
                hapticFeedback('light');
                setIsSearchInput(true);
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                hapticFeedback('light');
                openCart();
              }}
            >
              {totalCartCount > 0 ? (
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                  <Title
                    text={totalCartCount}
                    level={2}
                    className="!text-bw text-center"
                  />
                </div>
              ) : (
                <CartIcon />
              )}
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};
