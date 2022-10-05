import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import { MapLeafNodes } from './types';

// import { DefaultTheme } from './themes/DefaultTheme';
import { vars } from './theme';
// import { CashboardTheme } from './themes/CashboardTheme';
import { DarkTheme } from './themes/DarkTheme';
import { BaseTheme } from './themes/BaseTheme';

export type Theme = MapLeafNodes<typeof vars, string>;
export type CustomTheme = Theme;

const theme = createTheme(vars, BaseTheme);

createGlobalTheme(':root', vars, BaseTheme);

export const defaultTheme = theme;

export const dark = createTheme(vars, DarkTheme);
// TODO: move to packages/@collabkit/custom-themes
