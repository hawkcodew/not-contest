import {
  isMobile,
  versionAtLeast,
} from '@/features/hooks/useTelegramFeature.ts';

export const WebApp = window.Telegram.WebApp;

export function init(): void {
  WebApp.ready();

  if (!WebApp.BackButton || !WebApp.MainButton) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    WebApp?.HapticFeedback?.impactOccurred('light');
    WebApp.navigateBack();
  });

  if (versionAtLeast(WebApp.version, '6.1')) {
    WebApp.setHeaderColor(WebApp.themeParams.bg_color || '#ffffff');
    WebApp.setBackgroundColor(
      WebApp.themeParams.secondary_bg_color || '#ffffff'
    );
  }
  if (versionAtLeast(WebApp.version, '8.0') && isMobile()) {
    WebApp.requestFullscreen();
  }
}
