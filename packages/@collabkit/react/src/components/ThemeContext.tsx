import React, { createContext } from 'react';
import type { CustomTheme } from '../theme/themes.css';

export type ThemeContextValue = undefined | 'light' | 'dark' | CustomTheme;

export const ThemeContext = createContext<ThemeContextValue>(undefined);

export type ThemeProviderProps = {
  theme?: 'light' | 'dark' | CustomTheme;
  children: React.ReactNode;
};

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
