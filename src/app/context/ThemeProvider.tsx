import { createContext, PropsWithChildren, useEffect } from 'react';
import { WebApp } from '@/init.ts';

const ThemeContext = createContext('light');

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = WebApp.colorScheme;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
