import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import { MapLeafNodes } from './types';

import { LightTheme } from './themes/LightTheme';
import { vars } from './theme';
import { CashboardTheme } from './themes/CashboardTheme';

export type Theme = MapLeafNodes<typeof vars, string>;
export type CustomTheme = Theme;

const theme = createTheme(vars, LightTheme);

createGlobalTheme(':root', vars, LightTheme);

export const defaultTheme = theme;

export const dark = createTheme(vars, CashboardTheme);
// TODO: move to packages/@collabkit/custom-themes
