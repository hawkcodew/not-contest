import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WebApp } from '@/init.ts';
import { versionAtLeast } from '@/features/hooks/useTelegramFeature.ts';

interface UseBackButtonOptions {
  hide?: boolean;
  navigateTo?: string;
  onBack?: () => void;
}

export const useBackButton = ({
  hide,
  navigateTo,
  onBack,
}: UseBackButtonOptions) => {
  const navigate = useNavigate();
  const backButton = WebApp.BackButton;
  const isAvailable = versionAtLeast(WebApp.version, '6.1');

  useEffect(() => {
    if (!isAvailable) return;

    if (hide) {
      backButton.hide();
      return;
    }

    backButton.show();

    const handleClick = () => {
      WebApp?.HapticFeedback?.impactOccurred?.('light');

      if (onBack) onBack();
      if (navigateTo) navigate(navigateTo);
    };

    backButton.onClick(handleClick);

    return () => {
      backButton.offClick?.(handleClick);
    };
  }, [hide, navigateTo, onBack, isAvailable, navigate, backButton]);
};
