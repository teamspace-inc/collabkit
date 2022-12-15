import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import type { DeepPartial } from '@collabkit/core';

import type { MapLeafNodes } from './types';
import { vars } from './theme/index.css';
import { DarkTheme } from './themes/DarkTheme';
import { BaseTheme } from './themes/BaseTheme';

export type Theme = MapLeafNodes<typeof vars, string>;
export type CustomTheme = DeepPartial<Theme>;

createGlobalTheme(':root', vars, BaseTheme);
export const darkThemeClassName = createTheme(vars, DarkTheme);
