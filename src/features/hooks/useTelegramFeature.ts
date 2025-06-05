import { CatalogueItem } from '@/entities/catalogue/catalogue.types.ts';

export const WebApp = window.Telegram?.WebApp;
export const hapticFeedback = (
  style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
) => WebApp.HapticFeedback?.impactOccurred(style);
export const isMobile = () =>
  WebApp?.platform === 'ios' || WebApp?.platform === 'android';

function versionCompare(v1: string, v2: string): number {
  const a1 = v1.trim().split('.').map(Number);
  const a2 = v2.trim().split('.').map(Number);
  const len = Math.max(a1.length, a2.length);

  for (let i = 0; i < len; i++) {
    const p1 = a1[i] || 0;
    const p2 = a2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }

  return 0;
}

export function versionAtLeast(current: string, expected: string): boolean {
  return versionCompare(current, expected) >= 0;
}

export function shareLink(itemId: number) {
  const botUsername = import.meta.env.VITE_BOT_USERNAME;
  const appName = import.meta.env.VITE_APP_NAME;

  return `https://t.me/${botUsername}/${appName}?startapp=item=${itemId}`;
}

export function share(item: CatalogueItem) {
  const url = shareLink(item.id);

  const textBase = `\nCheck out this awesome ${item.category} ${item.name}!`;

  const encodedText = encodeURIComponent(textBase);
  const encodedUrl = encodeURIComponent(url);

  WebApp.openTelegramLink(
    `https://t.me/share/url?text=${encodedText}&url=${encodedUrl}`
  );
}

export function showAlert(message: string, callback?: () => void) {
  return WebApp.showAlert(message, callback);
}
