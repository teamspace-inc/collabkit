import React, { ComponentProps } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Theme, vars } from '../styles/themes.css';
import { useTheme } from './ThemeContext';

export function ThemeWrapper(props: ComponentProps<'div'>) {
  const { themeClassName, themeTokens } = useTheme();
  return (
    <div
      {...props}
      className={themeClassName}
      data-collabkit-internal="true"
      style={{
        display: 'contents',
        // Casting to ThemeTokens is needed because we are assigning a partial
        // theme where assignInlineVars expects a full theme.
        ...(themeTokens != null ? assignInlineVars(vars, themeTokens as Theme) : null),
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
