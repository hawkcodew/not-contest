export {};

interface TelegramWebAppThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
}

interface TelegramWebAppInitDataUnsafe {
  query_id?: string;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
  };
  auth_date?: number;
  hash?: string;
}

interface TelegramWebApp {
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: TelegramWebAppThemeParams;
  initData: string;
  initDataUnsafe: TelegramWebAppInitDataUnsafe;

  ready(): void;
  close(): void;
  expand(): void;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isFullscreen: boolean;

  MainButton: {
    text: string;
    color?: string;
    textColor?: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    setText(text: string): void;
    onClick(callback: () => void): void;
  };

  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
  };

  HapticFeedback?: {
    impactOccurred(
      style?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
    ): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };

  BiometricManager?: TelegramWebAppBiometricManager;

  setBackgroundColor(color: string): void;
  setHeaderColor(color: string): void;
  setNavigationBarColor(color: string): void;

  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string): void;
  openPopup(
    params: {
      title: string;
      message: string;
      buttons: {
        id: string;
        type: 'ok' | 'close' | 'cancel' | 'destructive';
        text: string;
      }[];
    },
    callback: (buttonId: string) => void
  ): void;

  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback: (ok: boolean) => void): void;
  showScanQrPopup(
    params: { text: string },
    callback: (data: string) => void
  ): void;
  closeScanQrPopup(): void;

  sendData(data: string): void;
  navigateBack(): void;

  switchInlineQuery(
    query: string,
    chatTypes?: ('users' | 'bots' | 'groups' | 'channels')[]
  ): void;

  requestFullscreen(): void;
  disableVerticalSwipes(): void;
  lockOrientation(): void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }

  module '*.lottie' {
    const value: Record<string>;
    export default value;
  }
}
