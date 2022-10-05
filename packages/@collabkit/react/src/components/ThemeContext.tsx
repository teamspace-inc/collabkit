import React, { createContext, useContext } from 'react';
import merge from 'deepmerge';
import type { CustomTheme } from '../styles/themes.css';
import { defaultTheme, dark } from '../styles/themes.css';

import { DarkTheme } from '../styles/themes/DarkTheme';
import { CashboardTheme } from '../styles/themes/CashboardTheme';

export type ThemeContextValue = {
  themeClassName: string;
  themeTokens: CustomTheme | null;
};

export const ThemeContext = createContext<ThemeContextValue>({
  themeClassName: '',
  themeTokens: null,
});

export type ThemeProviderProps = {
  theme?: 'light' | 'dark' | CustomTheme;
  children: React.ReactNode;
};
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  let themeClassName = '';
  let themeTokens = null;
  if (theme == null || theme === 'light') {
    themeClassName = '';
  } else if (theme === 'dark') {
    themeClassName = dark;
    // themeTokens = merge(defaultTheme, CashboardTheme);
  } else {
    themeTokens = merge(defaultTheme, theme);
  }
  return (
    <ThemeContext.Provider value={{ themeClassName, themeTokens }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
