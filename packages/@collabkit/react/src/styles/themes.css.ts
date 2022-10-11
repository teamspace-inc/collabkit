import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import { MapLeafNodes } from './types';

import { vars } from './theme';
import { DarkTheme } from './themes/DarkTheme';
import { BaseTheme } from './themes/BaseTheme';
import { DeepPartial } from '@collabkit/core';

export type Theme = MapLeafNodes<typeof vars, string>;
export type CustomTheme = DeepPartial<Theme>;

createGlobalTheme(':root', vars, BaseTheme);
export const darkThemeClassName = createTheme(vars, DarkTheme);
