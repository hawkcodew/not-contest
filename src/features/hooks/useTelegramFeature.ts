import { useMemo } from 'react';

export const WebApp = window.Telegram?.WebApp;
export const isFullScreen = () => WebApp?.isFullscreen;
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

export function useTelegramFeature(minVersion: string): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined' || !window.Telegram || !WebApp) {
      return false;
    }

    const current = WebApp.version;
    if (!current) {
      return false;
    }

    return versionAtLeast(current, minVersion);
  }, [minVersion]);
}
